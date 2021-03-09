import {WeatherTypes} from '../constants/actions';

export const updateApiKey = (apiKey) => ({
  data: apiKey,
  type: WeatherTypes.UPDATE_API_KEY,
});
