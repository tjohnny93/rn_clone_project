import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './src/navigatior/Tabs';

const Stack = createStackNavigator();

export default function App() {
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
