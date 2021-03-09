import {connect} from 'react-redux';

import {addFavorite, removeFavorite} from '../../actions/location';

import WeatherHeader from './weather-header';

const mapStateToProps = (state) => {
  return {
    currentLocation: state.views.location.current,
    favorites: state.views.location.favorites,
    weatherApiKey: state.views.weather.apiKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (location) => dispatch(addFavorite(location)),
    removeFavorite: (location) => dispatch(removeFavorite(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHeader);
