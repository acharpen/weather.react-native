import {connect} from 'react-redux';

import {removeFavorite, updateCurrent} from '../../actions/location';

import LocationFinder from './location-finder';

const mapStateToProps = (state) => {
  return {
    favorites: state.views.location.favorites,
    weatherApiKey: state.views.weather.apiKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (location) => dispatch(removeFavorite(location)),
    storeCurrentLocation: (location) => dispatch(updateCurrent(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationFinder);
