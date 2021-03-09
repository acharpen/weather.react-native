import 'moment/locale/fr';
import moment from 'moment';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from './components/loading/loading';
import WeatherHeader from './components/weather-header';
import {Routes} from './constants/routes';
import AboutScreen from './screens/about';
import LocationFinderScreen from './screens/location-finder';
import SettingsScreen from './screens/settings';
import WeatherScreen from './screens/weather';
import WeatherDetailsScreen from './screens/weather-details';
import {store, persistor} from './store/store';

moment.locale('fr');

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#64d2ff',
    primary: '#000',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.WEATHER}>
              <Stack.Screen
                component={WeatherScreen}
                name={Routes.WEATHER}
                options={{
                  headerTitle: (props) => (
                    <WeatherHeader title={props.children} />
                  ),
                  title: '',
                }}
              />
              <Stack.Screen
                component={WeatherDetailsScreen}
                name={Routes.WEATHER_DETAILS}
                options={({route}) => ({title: route.params.title})}
              />
              <Stack.Screen
                component={LocationFinderScreen}
                name={Routes.LOCATION_FINDER}
                options={{title: "Sélection d'un lieu"}}
              />
              <Stack.Screen
                component={SettingsScreen}
                name={Routes.SETTINGS}
                options={{title: 'Paramètres'}}
              />
              <Stack.Screen
                component={AboutScreen}
                name={Routes.ABOUT}
                options={{title: 'À propos'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
