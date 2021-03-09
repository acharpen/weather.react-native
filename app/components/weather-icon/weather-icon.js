import React from 'react';
import {Image} from 'react-native';

const WeatherIcon = ({data, height, width}) => {
  const getIconSource = () => {
    switch (data) {
      case '01d':
        return require('./img/01d.png');
      case '01n':
        return require('./img/01n.png');
      case '02d':
        return require('./img/02d.png');
      case '02n':
        return require('./img/02n.png');
      case '03d':
        return require('./img/03d.png');
      case '03n':
        return require('./img/03n.png');
      case '04d':
        return require('./img/04d.png');
      case '04n':
        return require('./img/04n.png');
      case '09d':
        return require('./img/09d.png');
      case '09n':
        return require('./img/09n.png');
      case '10d':
        return require('./img/10d.png');
      case '10n':
        return require('./img/10n.png');
      case '11d':
        return require('./img/11d.png');
      case '11n':
        return require('./img/11n.png');
      case '13d':
        return require('./img/13d.png');
      case '13n':
        return require('./img/13n.png');
      case '50d':
        return require('./img/50d.png');
      case '50n':
        return require('./img/50n.png');
    }
  };

  return (
    <Image
      source={getIconSource()}
      style={{
        backgroundColor: '#64d2ff',
        borderRadius: width / 2,
        height,
        width,
      }}
    />
  );
};

export default WeatherIcon;
