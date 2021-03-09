import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {formatTemp, formatWindSpeed} from '../../utils/weather-utils';

const LabelValue = ({label, value}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1}}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const WeatherDetails = ({route}) => {
  const {data} = route.params;

  return (
    <View style={styles.container}>
      <LabelValue
        label="Température"
        value={`${formatTemp(data.temp?.day ?? data.temp)}° / ${formatTemp(
          data.feels_like?.day ?? data.feels_like,
        )}°`}
      />
      <LabelValue label="Humidité" value={`${data.humidity}%`} />
      <LabelValue label="Nébulosité" value={`${data.clouds}%`} />
      <LabelValue label="Pression" value={`${data.pressure} hPa`} />
      <LabelValue
        label="Probabilité de pluie"
        value={`${Math.round(data.pop * 100)}%`}
      />
      <LabelValue
        label="Vitesse du vent"
        value={`${formatWindSpeed(data.wind_speed)} km/h`}
      />
      <LabelValue label="Orientation du vent" value={`${data.wind_deg}°`} />

      <View style={styles.tempDetailsWrapper}>
        {data.temp?.min && (
          <LabelValue
            label="Minimale"
            value={`${formatTemp(data.temp.min)}°`}
          />
        )}
        {data.temp?.max && (
          <LabelValue
            label="Maximale"
            value={`${formatTemp(data.temp.max)}°`}
          />
        )}
        {data.temp?.morn && (
          <LabelValue
            label="Matinée"
            value={`${formatTemp(data.temp?.morn)}° / ${formatTemp(
              data.feels_like?.morn,
            )}°`}
          />
        )}
        {data.temp?.eve && (
          <LabelValue
            label="Soirée"
            value={`${formatTemp(data.temp?.eve)}° / ${formatTemp(
              data.feels_like?.eve,
            )}°`}
          />
        )}
        {data.temp?.night && (
          <LabelValue
            label="Nuit"
            value={`${formatTemp(data.temp?.night)}° / ${formatTemp(
              data.feels_like?.night,
            )}°`}
          />
        )}
      </View>

      <View style={styles.optionalDetailsWrapper}>
        {data.sunrise && (
          <LabelValue
            label="Lever du soleil"
            value={moment.unix(data.sunrise).format('H:mm')}
          />
        )}
        {data.sunset && (
          <LabelValue
            label="Coucher du soleil"
            value={moment.unix(data.sunset).format('H:mm')}
          />
        )}
        {data.uvi && <LabelValue label="UV" value={data.uvi} />}
        {data.visibility && (
          <LabelValue label="Visibilité" value={`${data.visibility} m`} />
        )}
        {data.rain && (
          <LabelValue
            label="Volume de précipitation"
            value={`${data.rain} mm`}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  optionalDetailsWrapper: {
    marginTop: 16,
  },
  tempDetailsWrapper: {
    marginTop: 16,
  },
});

export default WeatherDetails;
