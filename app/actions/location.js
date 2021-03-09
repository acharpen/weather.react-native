import {LocationTypes} from '../constants/actions';

export const addFavorite = (location) => ({
  data: location,
  type: LocationTypes.ADD_FAVORITE,
});

export const removeFavorite = (location) => ({
  data: location,
  type: LocationTypes.REMOVE_FAVORITE,
});

export const updateCurrent = (location) => ({
  data: location,
  type: LocationTypes.UPDATE_CURRENT,
});
