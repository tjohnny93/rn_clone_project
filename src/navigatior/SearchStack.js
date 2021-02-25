import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/routers';
import SearchRoot from '../screens/SearchTab/SearchRoot';

const SearchTabStack = createStackNavigator();

export default function SearchStack() {
  return (
    <SearchTabStack.Navigator
      initialRouteName="SearchRoot"
      screenOptions={({ route, navigation }) => ({
        // headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: false,
        gestureEnabled: true,
      })}
    >
      <SearchTabStack.Screen name="SearchRoot" component={SearchRoot} />
      {/* <SearchTabStack.Screen name="ListDetail" component={ListDetail} /> */}
      {/* <SearchTabStack.Screen name="SongList" component={HomeRoot} /> */}
    </SearchTabStack.Navigator>
  );
}
