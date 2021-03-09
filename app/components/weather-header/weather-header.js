import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../constants/routes';
import {areSameLocations} from '../../utils/location-utils';

const WeatherHeader = ({
  addFavorite,
  currentLocation,
  favorites,
  removeFavorite,
  title,
  weatherApiKey,
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const isFavorite = () =>
    favorites.some((favorite) => areSameLocations(favorite, currentLocation));

  const openAbout = () => {
    navigation.navigate(Routes.ABOUT);
    setMenuVisible(false);
  };

  const openLocationFinder = () => {
    navigation.navigate(Routes.LOCATION_FINDER);
  };

  const openSettings = () => {
    navigation.navigate(Routes.SETTINGS);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {weatherApiKey && (
        <IconButton
          icon="magnify"
          onPress={openLocationFinder}
          style={styles.icon}
        />
      )}

      {weatherApiKey &&
        currentLocation &&
        (isFavorite() ? (
          <IconButton
            icon={'star'}
            onPress={() => removeFavorite(currentLocation)}
            style={styles.icon}
          />
        ) : (
          <IconButton
            icon={'star-outline'}
            onPress={() => addFavorite(currentLocation)}
            style={styles.icon}
          />
        ))}

      <Menu
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={() => setMenuVisible(true)}
            style={styles.icon}
          />
        }
        onDismiss={() => setMenuVisible(false)}
        visible={menuVisible}>
        <Menu.Item onPress={openSettings} title="Paramètres" />
        <Menu.Item onPress={openAbout} title="À propos" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    margin: 0,
  },
  title: {
    flex: 1,
    fontSize: 24,
  },
});

export default WeatherHeader;
