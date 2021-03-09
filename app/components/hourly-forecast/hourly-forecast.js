import moment from 'moment';
import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../constants/routes';
import {formatTimeStampToFullDateTime} from '../../utils/date-utils';
import {formatTemp, formatWindSpeed} from '../../utils/weather-utils';
import WeatherIcon from '../weather-icon';

const HourlyForecast = ({data}) => {
  const navigation = useNavigation();

  const openWeatherDetails = ({item, date}) => {
    navigation.navigate(Routes.WEATHER_DETAILS, {
      data: item,
      title: formatTimeStampToFullDateTime(date),
    });
  };

  const renderItem = ({item, index}) => {
    const currentDate = moment.unix(item.dt);
    const previousDate = moment.unix(index > 0 ? data[index - 1].dt : item.dt);

    return (
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{marginBottom: 34}}>
          <Pressable
            onPress={() => openWeatherDetails({item, date: currentDate})}
            style={({pressed}) => [
              {
                alignItems: 'center',
                backgroundColor: pressed ? '#d9d9d9' : '#f2f2f2',
                borderRadius: 4,
                paddingVertical: 8,
                width: 62,
              },
            ]}>
            <WeatherIcon data={item.weather[0].icon} height={40} width={40} />

            <View>
              <Icon
                name="navigation"
                size={20}
                style={{
                  marginVertical: 4,
                  transform: [{rotateZ: `${item.wind_deg}deg`}],
                }}
              />
            </View>

            <Text style={{fontWeight: 'bold'}}>{formatTemp(item.temp)}°</Text>

            <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>
                {formatWindSpeed(item.wind_speed)}
              </Text>
              <Text style={{fontSize: 12, marginLeft: 2}}>km/h</Text>
            </View>
          </Pressable>
        </View>

        <View
          style={{
            alignItems: 'center',
            height: 46,
            width: 30,
          }}>
          <View style={{backgroundColor: 'black', height: 8, width: 1}} />
          <Text>{currentDate.format('H')}h</Text>
          {currentDate.date() !== previousDate.date() && (
            <Text>{currentDate.format('ddd')}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HourlyForecast;
