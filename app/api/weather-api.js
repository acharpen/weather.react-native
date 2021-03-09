export const WeatherApi = {
  fetchCityFromCoordinates: async ({latitude, longitude, apiKey}) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    const json = await response.json();

    return {
      name: json.name,
    };
  },

  fetchCoordinatesFromCityId: async ({cityId, apiKey}) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityId.toLowerCase()}&appid=${apiKey}`,
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    const json = await response.json();

    return {
      lat: json.coord.lat,
      lon: json.coord.lon,
    };
  },

  fetchWeatherData: async ({latitude, longitude, apiKey}) => {
    const langCode = 'fr';

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=${langCode}&units=metric&appid=${apiKey}`,
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    const json = await response.json();

    return {
      current: {
        // clouds: json.current.clouds,
        // dew_point: json.current.dew_point,
        dt: json.current.dt,
        feels_like: json.current.feels_like,
        // humidity: json.current.humidity,
        // pressure: json.current.pressure,
        // sunrise: json.current.sunrise,
        // sunset: json.current.sunset,
        temp: json.current.temp,
        // uvi: json.current.uvi,
        // visibility: json.current.visibility,
        // wind_deg: json.current.wind_deg,
        // wind_speed: json.current.wind_speed,
        // rain: {
        //   '1h': json.current.rain ? json.current.rain['1h'] : null,
        // },
        // snow: {
        //   '1h': json.current.snow ? json.current.snow['1h'] : null,
        // },
        weather: json.current.weather.map((weather) => ({
          description: weather.description,
          icon: weather.icon,
        })),
      },
      // minutely: json.minutely.map((minutely) => ({
      //   dt: minutely.dt,
      //   precipitation: minutely.precipitation,
      // })),
      hourly: json.hourly.map((hourly) => ({
        clouds: hourly.clouds,
        // dew_point: hourly.dew_point,
        dt: hourly.dt,
        feels_like: hourly.feels_like,
        humidity: hourly.humidity,
        pop: hourly.pop,
        pressure: hourly.pressure,
        temp: hourly.temp,
        visibility: hourly.visibility,
        wind_deg: hourly.wind_deg,
        wind_speed: hourly.wind_speed,
        // rain: {
        //   '1h': hourly.rain ? hourly.rain['1h'] : null,
        // },
        // snow: {
        //   '1h': hourly.snow ? hourly.snow['1h'] : null,
        // },
        weather: hourly.weather.map((weather) => ({
          description: weather.description,
          icon: weather.icon,
        })),
      })),
      daily: json.daily.map((daily) => ({
        clouds: daily.clouds,
        // dew_point: daily.dew_point,
        dt: daily.dt,
        humidity: daily.humidity,
        pop: daily.pop,
        pressure: daily.pressure,
        rain: daily.rain,
        sunrise: daily.sunrise,
        sunset: daily.sunset,
        uvi: daily.uvi,
        wind_deg: daily.wind_deg,
        wind_speed: daily.wind_speed,
        feels_like: {
          day: daily.feels_like.day,
          eve: daily.feels_like.eve,
          morn: daily.feels_like.morn,
          night: daily.feels_like.night,
        },
        // rain: {
        //   '1h': daily.rain ? daily.rain['1h'] : null,
        // },
        // snow: {
        //   '1h': daily.snow ? daily.snow['1h'] : null,
        // },
        temp: {
          day: daily.temp.day,
          eve: daily.temp.eve,
          max: daily.temp.max,
          min: daily.temp.min,
          morn: daily.temp.morn,
          night: daily.temp.night,
        },
        weather: daily.weather.map((weather) => ({
          description: weather.description,
          icon: weather.icon,
        })),
      })),
    };
  },
};
