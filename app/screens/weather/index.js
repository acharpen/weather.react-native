import {connect} from 'react-redux';

import Weather from './weather';

const mapStateToProps = (state) => {
  return {
    currentLocation: state.views.location.current,
    weatherApiKey: state.views.weather.apiKey,
  };
};

export default connect(mapStateToProps)(Weather);
