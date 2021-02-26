import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import LibraryRoot from '../screens/LibraryTab/LibraryRoot';
import PremiumRoot from '../screens/PremiumTab/PremiumRootTab';
import { greaterThan } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <Image
          style={{ width: 64, height: 64 }}
          source={{
            uri: 'https://image.bugsm.co.kr/album/images/500/3917/391751.jpg',
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>자우림</Text>
          <Text style={{ color: 'white', fontSize: 20 }}> - </Text>
          <Text style={{ color: 'white', fontSize: 20 }}>
            스물다섯, 스물하나
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="ios-bluetooth" size={24} color="white" />
          <Icon name="ios-play" size={30} color="white" />
          <Icon name="pause" size={30} color="white" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLable !== undefined
              ? options.tabBarLable
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const TAB_ICON = {
            Home: 'home',
            Search: 'search-outline',
            Library: 'ios-library-sharp',
            Premium: 'ios-musical-notes',
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <Icon
                name={TAB_ICON[label]}
                size={36}
                color={isFocused ? 'white' : '#595959'}
              />
              <Text style={{ color: isFocused ? 'white' : '#7a7a7a' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function Tabs() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={props => <MyTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Library" component={LibraryRoot} />
          <Tab.Screen name="Premium" component={PremiumRoot} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 12,
    // paddingBottom: 38,
  },
  playerContainer: {
    flexDirection: 'row',
    height: 76,
    backgroundColor: '#212121',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    // paddingTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 32,
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 8,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    // borderRightWidth: 1,
    // borderRightColor: 'green',
  },
});
