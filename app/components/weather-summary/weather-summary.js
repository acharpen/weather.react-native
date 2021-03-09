import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {formatWeatherDescription, formatTemp} from '../../utils/weather-utils';
import WeatherIcon from '../weather-icon';

const WeatherSummary = ({data}) => {
  return (
    <View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>
          {formatWeatherDescription(data.weather[0].description)}
        </Text>
      </View>

      <View style={styles.iconTempWrapper}>
        <View style={styles.tempWrapper}>
          <Text style={styles.temp}>{formatTemp(data.temp)}°</Text>

          <Text>
            <Text>Ressentie : </Text>
            <Text>{formatTemp(data.feels_like)}°</Text>
          </Text>
        </View>

        <View style={styles.iconWrapper}>
          <WeatherIcon data={data.weather[0].icon} height={150} width={150} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 20,
    marginTop: 8,
  },
  descriptionWrapper: {
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'flex-start',
    flex: 2,
  },
  iconTempWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },

  infoWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  temp: {
    fontSize: 32,
  },
  tempWrapper: {
    alignItems: 'center',
    flex: 1,
  },
});

export default WeatherSummary;
