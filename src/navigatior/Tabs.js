import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
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
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    currentlyPlaying();
  }, []);

  const changeCurrentlyPlaying = song_url => {
    //
    //여기서 현재 플레이되는 노래 변경
    //
  };

  const song = {
    id: 1,
    uri:
      'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c283aac8-9041-4a11-8693-d3313c38ccdc/yet.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210301T074116Z&X-Amz-Expires=86400&X-Amz-Signature=262aa8e7a3d9b340eff1dda0bc9a7817e591f548fe2693fc201b0fb0a40e0255&X-Amz-SignedHeaders=host',
    imgUrl:
      'https://music-phinf.pstatic.net/20210223_23/1614046317007ONHEP_JPEG/0-1.jpg?type=w720',
    title: '음악이흐르고',
    artist: '태성현',
  };

  const currentlyPlaying = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: isPlaying },
      playerStatus
    );
    setSound(sound);
  };

  const playController = async () => {
    if (!sound) {
      //sound가 없으면 그냥 함수호출안하고
      return;
    }
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  const playerStatus = status => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
  };

  const getProgress = () => {
    if (sound === null || duration === null || position === null) return 0;
    return Math.floor((position / duration) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View
          style={{
            backgroundColor: '#1DB954',
            height: 8,
            width: `${getProgress()}%`,
          }}
          // style={{ backgroundColor: 'green', height: 30, width: '30%' }}
        />
      </View>
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
            onPress={() => playController()}
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
  statusContainer: {
    backgroundColor: '#505050',
    height: 4,
    // width: { getProgress },
    // width: '100%',
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
