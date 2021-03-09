import moment from 'moment';
import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../constants/routes';
import {formatTimeStampToFullDate} from '../../utils/date-utils';
import {formatTemp} from '../../utils/weather-utils';
import WeatherIcon from '../weather-icon';

const DailyForecast = ({data}) => {
  const navigation = useNavigation();

  const openWeatherDetails = ({item, date}) => {
    navigation.navigate(Routes.WEATHER_DETAILS, {
      data: item,
      title: formatTimeStampToFullDate(date),
    });
  };

  const renderItem = ({item}) => {
    const date = moment.unix(item.dt);

    return (
      <View style={{padding: 8}}>
        <Pressable
          onPress={() => openWeatherDetails({item, date})}
          style={({pressed}) => [
            {
              alignItems: 'center',
              backgroundColor: pressed ? '#f2f2f2' : '#d9d9d9',
              borderRadius: 4,
              paddingVertical: 4,
              width: 62,
            },
          ]}>
          <Text>{date.format('ddd').toLowerCase()}</Text>

          <Text>{date.format('D')}</Text>

          <View style={{marginTop: 8}}>
            <WeatherIcon data={item.weather[0].icon} height={40} width={40} />
          </View>

          <View style={{marginTop: 4}}>
            <Text style={{fontWeight: 'bold'}}>
              {formatTemp(item.temp.max)}°
            </Text>

            <Text style={{borderTopWidth: 1, fontWeight: 'bold'}}>
              {formatTemp(item.temp.min)}°
            </Text>
          </View>
        </Pressable>
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

export default DailyForecast;
