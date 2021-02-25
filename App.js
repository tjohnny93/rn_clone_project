import React, { useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
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
    <>
      <Tabs />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
