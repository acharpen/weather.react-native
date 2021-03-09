import {combineReducers} from 'redux';

import {LocationTypes} from '../../constants/actions';

const current = (state = null, action) => {
  switch (action.type) {
    case LocationTypes.UPDATE_CURRENT: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};

const favorites = (state = [], action) => {
  switch (action.type) {
    case LocationTypes.ADD_FAVORITE: {
      return [...state, action.data];
    }

    case LocationTypes.REMOVE_FAVORITE: {
      return state.filter((favorite) => favorite !== action.data);
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  current,
  favorites,
});
