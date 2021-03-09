import {connect} from 'react-redux';

import {updateApiKey} from '../../actions/weather';

import Settings from './settings';

const mapStateToProps = (state) => {
  return {
    storedWeatherApiKey: state.views.weather.apiKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeWeatherApiKey: (apiKey) => dispatch(updateApiKey(apiKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
