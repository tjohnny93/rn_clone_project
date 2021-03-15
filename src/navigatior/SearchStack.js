import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchRoot from '../screens/SearchTab/SearchRoot';

const SearchTabStack = createStackNavigator();

export default function SearchStack() {
  return (
    <SearchTabStack.Navigator
      initialRouteName="SearchRoot"
      screenOptions={({ route, navigation }) => ({
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: false,
        gestureEnabled: true,
      })}
    >
      <SearchTabStack.Screen name="SearchRoot" component={SearchRoot} />
    </SearchTabStack.Navigator>
  );
}
