import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getVersion} from 'react-native-device-info';

const About = () => {
  return (
    <View style={styles.container}>
      <Text>Version {getVersion()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default About;
