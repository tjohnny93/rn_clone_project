import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationActions } from 'react-navigation';
import HomeStack from './HomeStack';
import HomeRoot from '../screens/HomeTab/HomeRoot';
import SearchStack from './SearchStack';
import LibraryRoot from '../screens/LibraryTab/LibraryRoot';
import PremiumRoot from '../screens/PremiumTab/PremiumRootTab';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const PLAY_ICON = {
  false: 'ios-play',
  true: 'pause',
};
const TAB_ICON = {
  Home: 'home',
  Search: 'search-outline',
  Library: 'ios-library-sharp',
  Premium: 'ios-musical-notes',
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const changeCurrentlyPlaying = song_url => {
    //
    //여기서 현재 플레이되는 노래 변경
    //
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#505050', height: 4 }}></View>
      <View style={styles.playerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Image
              style={{ width: 76, height: 76 }}
              source={{
                uri:
                  'https://image.bugsm.co.kr/album/images/500/3917/391751.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, paddingBottom: 4 }}>
              자우림
            </Text>
            <Text style={{ color: '#909090', fontSize: 16 }}>
              스물다섯, 스물하나
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Icon name="ios-bluetooth" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => togglePlay()}
            style={{ paddingLeft: 28 }}
          >
            <Icon name={PLAY_ICON[isPlaying]} size={36} color="white" />
          </TouchableOpacity>
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
            // if (isFocused) {
            //   navigation.navigate(route.name);
            // }
            // if (isFocused) {
            //   navigation.reset({ index: 0, routes: [{ name: HomeStack }] });
            //   // NavigationActions.reset({
            //   //   index: 0,
            //   //   actions: [
            //   //     NavigationActions.navigate({ routeName: HomeStack }),
            //   //   ],
            //   // })
            // }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
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
          <Tab.Screen
            name="Home"
            component={HomeStack}
            listeners={({ navigation }) => ({
              tabPress: e => {
                navigation.navigate(HomeRoot);
              },
            })}
          />
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
    paddingRight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 8,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
});
