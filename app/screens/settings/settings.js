import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

import WeatherApiKeyDialog from '../../components/weather-api-key-dialog/';

const Settings = ({storedWeatherApiKey, storeWeatherApiKey}) => {
  const [weatherApiKeyDialogVisible, setWeatherApiKeyDialogVisible] = useState(
    false,
  );

  const updateWeatherApiKey = (apiKey) => {
    setWeatherApiKeyDialogVisible(false);
    storeWeatherApiKey(apiKey);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clé de l'API OpenWeather</Text>

        <View style={styles.setting}>
          <Text style={styles.settingValue}>{storedWeatherApiKey}</Text>

          <IconButton
            icon="pencil"
            onPress={() => setWeatherApiKeyDialogVisible(true)}
            size={20}
            style={styles.icon}
          />
        </View>
      </View>

      <WeatherApiKeyDialog
        currentApiKey={storedWeatherApiKey}
        onCancel={() => setWeatherApiKeyDialogVisible(false)}
        onValidate={updateWeatherApiKey}
        visible={weatherApiKeyDialogVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
  },
  setting: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingValue: {
    borderBottomWidth: 1,
    flex: 1,
  },
});

export default Settings;
