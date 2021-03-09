import {combineReducers} from 'redux';

import {WeatherTypes} from '../../constants/actions';

const apiKey = (state = null, action) => {
  switch (action.type) {
    case WeatherTypes.UPDATE_API_KEY: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};

const data = (state = {}, action) => {
  switch (action.type) {
    case WeatherTypes.UPDATE_DATA: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  apiKey,
  data,
});
