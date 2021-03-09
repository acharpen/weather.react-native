import React, {useEffect, useState} from 'react';
import {FlatList, PermissionsAndroid, StyleSheet, View} from 'react-native';
import {Divider, FAB, IconButton, List, Snackbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

import {WeatherApi} from '../../api/weather-api';
import LocationDialog from '../../components/location-dialog';
import {formatLocatioName} from '../../utils/location-utils';

const LocationFinder = ({
  favorites,
  removeFavorite,
  storeCurrentLocation,
  weatherApiKey,
}) => {
  const navigation = useNavigation();
  const [actualLocation, setActualLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission géolocalisation',
        message: 'Cette application souhaite accéder à votre localisation',
      },
    )
      .then((granted) => {
        if (granted) {
          Geolocation.getCurrentPosition(
            ({coords}) => {
              WeatherApi.fetchCityFromCoordinates({
                apiKey: weatherApiKey,
                latitude: coords.latitude,
                longitude: coords.longitude,
              })
                .then((json) => {
                  setActualLocation({
                    lat: coords.latitude,
                    lon: coords.longitude,
                    name: formatLocatioName(json.name),
                  });
                })
                .catch(() => {
                  showLocationError();
                });
            },
            () => showLocationError(),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          showLocationError();
        }
      })
      .catch(() => {
        showLocationError();
      });
  }, [weatherApiKey]);

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
    setErrorMsg(null);
  };

  const findLocation = (name) => {
    setLocationDialogVisible(false);

    WeatherApi.fetchCoordinatesFromCityId({
      apiKey: weatherApiKey,
      cityId: name,
    })
      .then((json) => {
        setNewCurrentLocationAndGoBack({
          ...json,
          name: formatLocatioName(name),
        });
      })
      .catch(() => {
        setErrorMsg(`Aucune donnée disponible pour ${name}.`);
        setSnackbarVisible(true);
      });
  };

  const setNewCurrentLocationAndGoBack = (location) => {
    storeCurrentLocation(location);
    navigation.goBack();
  };

  const showLocationError = () => {
    setErrorMsg('Impossible de récupérer la position GPS actuelle.');
    setSnackbarVisible(true);
  };

  const renderItem = ({item}) => {
    return (
      <List.Item
        onPress={() => setNewCurrentLocationAndGoBack(item)}
        right={() => (
          <IconButton
            icon="delete"
            size={20}
            onPress={() => removeFavorite(item)}
          />
        )}
        title={item.name}
      />
    );
  };

  return (
    <View style={styles.container}>
      {actualLocation && (
        <View>
          <List.Item
            description="Activer le GPS pour une précision optimale."
            onPress={() => setNewCurrentLocationAndGoBack(actualLocation)}
            title={`${'Position actuelle'} (${actualLocation.name})`}
          />
          <Divider />
        </View>
      )}
      <FlatList
        data={favorites}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
      />

      <FAB
        icon="plus"
        onPress={() => setLocationDialogVisible(true)}
        small
        style={styles.fab}
      />

      <LocationDialog
        onCancel={() => setLocationDialogVisible(false)}
        onValidate={findLocation}
        visible={locationDialogVisible}
      />

      <Snackbar
        duration={Snackbar.DURATION_SHORT}
        onDismiss={dismissSnackbar}
        visible={snackbarVisible}>
        {errorMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
});

export default LocationFinder;
