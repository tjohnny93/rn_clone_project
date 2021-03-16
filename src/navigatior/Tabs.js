import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { setBarStatus, setNextMusic, setStatus } from '../actions/currentMusic';

import HomeStack from './HomeStack';
import HomeRoot from '../screens/HomeTab/HomeRoot';
import SearchStack from './SearchStack';
import LibraryTopTab from './LibraryTopTab';
import PremiumRoot from '../screens/PremiumTab/PremiumRootTab';
import TrackDetailModal from '../screens/HomeTab/components/TrackDetailModal';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const PLAY_ICON = {
  false: 'ios-play',
  undefined: 'ios-play',
  true: 'pause',
};
const TAB_ICON = {
  Home: 'home',
  Search: 'search-outline',
  Library: 'ios-library-sharp',
  Premium: 'ios-musical-notes',
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const isPlaying = useSelector(state => state.setMusic.isPlaying);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const currentPlayList = useSelector(state => state.setMusic.playList);
  const currentIndex = useSelector(state => state.setMusic.currentIndex);
  const currentMusic = currentPlayList[currentIndex];
  const playButton = useSelector(state => state.setMusic.playButton);

  useEffect(() => {
    if (sound) sound.unloadAsync(); // unload
    playSound();
  }, [currentIndex]);

  useEffect(() => {
    playController();
  }, [playButton]);

  const playerStatus = async status => {
    if (!status.isLoaded) {
      if (status.error) {
        console.log(`Error on expo AV: ${status.error}`);
      }
    } else {
      dispatch(setStatus(status.isPlaying));
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);

      if (status.didJustFinish) {
        dispatch(setNextMusic());
      }
    }
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: currentMusic?.track?.preview_url },
      { shouldPlay: true },
      playerStatus
    );
    setSound(sound);
  };

  const playController = async () => {
    if (!sound) {
      return;
    }
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  const getProgress = () => {
    if (sound === null || duration === null || position === null) return 0;
    let barStatus = Math.floor((position / duration) * 100);
    dispatch(setBarStatus(barStatus, position, duration));
    return barStatus;
  };

  const toggleTrackDetailModal = () => {
    setIsVisible(!isVisible);
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
        />
      </View>

      <View style={styles.playerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TrackDetailModal
            isVisible={isVisible}
            toggleTrackDetailModal={toggleTrackDetailModal}
          />
          <TouchableOpacity onPress={() => toggleTrackDetailModal()}>
            {currentMusic?.track ? (
              <Image
                style={{ width: 76, height: 76 }}
                source={{
                  uri: currentMusic?.track
                    ? currentMusic.track.album.images[1].url
                    : null,
                }}
              />
            ) : (
              <>
                <Icon
                  name="musical-note-sharp"
                  size={48}
                  color="#1DB954"
                  style={{ marginLeft: 32, position: 'relative' }}
                />
                <Icon
                  name="play-circle"
                  size={28}
                  color="#606060"
                  style={{ position: 'absolute', left: 20, top: 8 }}
                />
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 12,
              width: 220,
            }}
            onPress={() => toggleTrackDetailModal()}
          >
            <Text
              numberOfLines={1}
              style={{ color: 'white', fontSize: 20, paddingBottom: 4 }}
            >
              {currentMusic?.track ? currentMusic.track.name : 'Melodify...'}
            </Text>
            <Text numberOfLines={1} style={{ color: '#909090', fontSize: 16 }}>
              {currentMusic?.track
                ? currentMusic.track.artists[0].name
                : '노래를 선택해주세요.'}
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
        <Tab.Screen name="Library" component={LibraryTopTab} />
        <Tab.Screen name="Premium" component={PremiumRoot} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  statusContainer: {
    backgroundColor: '#505050',
    height: 4,
    width: '100%',
  },
  playerContainer: {
    flexDirection: 'row',
    width: '100%',
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
