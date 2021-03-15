import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/routers';
import HomeRoot from '../screens/HomeTab/HomeRoot';
import ListDetail from '../screens/HomeTab/ListDetail';
import SongList from '../screens/HomeTab/SongList';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={({ route, navigation }) => ({
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: false,
        gestureEnabled: true,

        headerTintColor: 'white',
      })}
    >
      <MainStack.Screen name="HomeRoot" component={HomeRoot} />
      <MainStack.Screen name="ListDetail" component={ListDetail} />
    </MainStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MainStack"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SongList"
        component={SongList}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
    </RootStack.Navigator>
  );
}
