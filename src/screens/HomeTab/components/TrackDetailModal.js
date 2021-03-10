import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  setNextMusic,
  setPrevMusic,
  togglePlay,
} from '../../../actions/currentMusic';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { likeTrack, unLikeTrack } from '../../../actions/likedStatus';

export default function TrackDetailModal({
  navigation,
  route,
  toggleTrackDetailModal,
  isVisible,
}) {
  const isPlaying = useSelector(state => state.setMusic.isPlaying);
  // const currentPlayList = useSelector(state => state.setMusic.playList);
  // const currentIndex = useSelector(state => state.setMusic.currentIndex);
  const likedTrack = useSelector(state => state.setLiked.likedTrack);
  const currentMusic = useSelector(state => state.setMusic.currentMusic);
  const listTitle = useSelector(state => state.setMusic.listTitle);
  const barStatus = useSelector(state => state.setMusic.barStatus);
  const positionMillis = useSelector(state => state.setMusic.positionMillis);
  const durationMillis = useSelector(state => state.setMusic.durationMillis);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   // setIsVisible(true);
  // }, []);

  const closeModal = () => {
    // navigation.goBack();
    // setIsVisible(false);
    toggleTrackDetailModal();
  };

  const getTime = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
  };

  const changePlayStatus = () => {
    dispatch(togglePlay());
  };

  const skipTrack = option => {
    option === 'next' ? dispatch(setNextMusic()) : dispatch(setPrevMusic());
  };

  const addToLiked = track => {
    likedTrack.includes(track)
      ? dispatch(unLikeTrack(track))
      : dispatch(likeTrack(track));

    console.log(likedTrack);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <SafeAreaView style={styles.modalContainer}>
        <BlurView tint="dark" intensity={100} style={{ flex: 1 }}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Icon name="down" size={28} color="white" />
            </TouchableOpacity>
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 20 }}>
              {listTitle.length > 0
                ? listTitle
                : '플레이 리스트를 선택해주세요.'}
            </Text>
            <TouchableOpacity>
              <Icon name="ellipsis1" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentWrapper}>
            <View>
              <Image
                source={{ uri: currentMusic?.track?.album?.images[0]?.url }}
                style={{ width: 360, height: 360 }}
              />
            </View>
            <View style={styles.trackHeader}>
              <Text
                style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}
              >
                {currentMusic?.track?.name}
              </Text>
              <Text style={{ color: '#939393', fontSize: 20, marginTop: 12 }}>
                {currentMusic?.track?.artists[0]?.name}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#404040',
                width: '83%',
                marginTop: 24,
                borderRadius: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: '#979797',
                  height: 4,
                  borderRadius: 4,
                  width: `${barStatus}%`,
                }}
              />
            </View>

            <View style={styles.trackTimeWrapper}>
              <Text style={{ color: 'white' }}>{getTime(positionMillis)}</Text>
              <Text style={{ color: 'white' }}>-{getTime(durationMillis)}</Text>
            </View>
            <View style={styles.controlWrapper}>
              <TouchableOpacity onPress={() => addToLiked(currentMusic)}>
                <Icon
                  name={likedTrack.includes(currentMusic) ? 'heart' : 'hearto'}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => skipTrack('prev')}>
                <Icon name="stepbackward" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changePlayStatus()}>
                <Icon
                  name={!isPlaying ? 'play' : 'pausecircle'}
                  size={60}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity name="next" onPress={() => skipTrack('next')}>
                <Icon name="stepforward" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="minuscircleo" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.footerWrapper}>
              <TouchableOpacity>
                <Icon name="iconfontdesktop" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="export" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  headerWrapper: {
    marginVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 60,
    alignItems: 'center',
  },
  trackHeader: {
    width: '100%',
    paddingLeft: 34,
    marginTop: 48,
  },
  trackTimeWrapper: {
    marginTop: 12,
    width: '83%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlWrapper: {
    marginTop: 36,
    width: '83%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerWrapper: {
    marginTop: 48,
    width: '83%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
