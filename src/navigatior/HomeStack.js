import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/routers';
import HomeRoot from '../screens/HomeTab/HomeRoot';
import ListDetail from '../screens/HomeTab/ListDetail';

const MainStack = createStackNavigator();

export default function HomeStack() {
  return (
    <MainStack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={({ route, navigation }) => ({
        // headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: false,
        gestureEnabled: true,
      })}
    >
      <MainStack.Screen name="HomeRoot" component={HomeRoot} />
      <MainStack.Screen name="ListDetail" component={ListDetail} />
      <MainStack.Screen name="SongList" component={HomeRoot} />
    </MainStack.Navigator>
  );
}
