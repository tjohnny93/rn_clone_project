import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import rootReducer from './src/reducers/';
import thunk from 'redux-thunk';
// import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import Tabs from './src/navigatior/Tabs';

console.disableYellowBox = true; // disables the yellow warning signs overall

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(result, 'Splash Screen Loading'))
  .catch(console.warn);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        {/* <StatusBar barStyle="default" style={styles.topBar} /> */}
        <Tabs />
      </SafeAreaView>
    </Provider>
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
