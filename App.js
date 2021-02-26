import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import Tabs from './src/navigatior/Tabs';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(result, 'Splash Screen Loading'))
  .catch(console.warn);

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <StatusBar barStyle="default" style={styles.topBar} /> */}
      <Tabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(33, 33, 33, 1)',
  },
  topBar: {
    // backgroundColor: 'rgba(33, 33, 33, 0.5)',
  },
});
