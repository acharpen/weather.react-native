import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  PlatformColor,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {WeatherApi} from '../../api/weather-api';
import DailyForecast from '../../components/daily-forecast';
import HourlyForecast from '../../components/hourly-forecast';
import Loading from '../../components/loading';
import WeatherSummary from '../../components/weather-summary';
import {Routes} from '../../constants/routes';

const Weather = ({currentLocation, weatherApiKey}) => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentLocation) {
      load();
    }
  }, [currentLocation, load]);

  const load = useCallback(() => {
    setLoading(true);

    navigation.setOptions({title: currentLocation.name});

    return WeatherApi.fetchWeatherData({
      apiKey: weatherApiKey,
      latitude: currentLocation.lat,
      longitude: currentLocation.lon,
    })
      .then((json) => {
        setData(json);
      })
      .catch(() => setData(null))
      .finally(() => {
        setLoading(false);
      });
  }, [currentLocation, navigation, weatherApiKey]);

  const openLocationFinder = () => {
    navigation.navigate(Routes.LOCATION_FINDER);
  };

  const openSettings = () => {
    navigation.navigate(Routes.SETTINGS);
  };

  return (
    <View style={styles.container}>
      {!weatherApiKey ? (
        <View style={styles.infoWrapper}>
          <Text>
            <Text>Veuillez renseigner les informations</Text>
            <Text style={{fontStyle: 'italic'}}> OpenWeather</Text>
            <Text> dans les</Text>
            <Text style={styles.link} onPress={openSettings}>
              {' '}
              paramètres
            </Text>
            <Text>.</Text>
          </Text>
        </View>
      ) : !currentLocation ? (
        <View style={styles.infoWrapper}>
          <Text>
            <Text>Veuillez sélectionner un</Text>
            <Text style={styles.link} onPress={openLocationFinder}>
              {' '}
              lieu
            </Text>
            <Text>.</Text>
          </Text>
        </View>
      ) : !data && !loading ? (
        <View style={styles.infoWrapper}>
          <Text>Impossible de récupérer les données météo.</Text>
        </View>
      ) : loading ? (
        <Loading />
      ) : (
        data && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={load} />
            }
            style={styles.scrollContainer}>
            <WeatherSummary data={data.current} />

            <View style={styles.hourlyForecastWrapper}>
              <HourlyForecast data={data.hourly} navigation={navigation} />
            </View>

            <View style={styles.dailyForecastWrapper}>
              <DailyForecast data={data.daily} navigation={navigation} />
            </View>

            <View style={styles.synchroWrapper}>
              <Text style={styles.synchro}>
                {moment.unix(data.current.dt).format()}
              </Text>
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dailyForecastWrapper: {
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
    marginTop: 24,
  },
  hourlyForecastWrapper: {
    marginTop: 24,
  },
  infoWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  link: {
    ...Platform.select({
      ios: {color: PlatformColor('link')},
      android: {
        color: PlatformColor('?attr/colorAccent'),
      },
      default: {color: 'black'},
    }),
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  synchro: {
    fontSize: 12,
  },
  synchroWrapper: {
    alignItems: 'center',
    marginTop: 32,
  },
});

export default Weather;
