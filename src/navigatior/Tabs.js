import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import LibraryRoot from '../screens/LibraryTab/LibraryRoot';
import PremiumRoot from '../screens/PremiumTab/PremiumRootTab';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeStack} tabBarVisible={false} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Library" component={LibraryRoot} />
          <Tab.Screen name="Premium" component={PremiumRoot} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
