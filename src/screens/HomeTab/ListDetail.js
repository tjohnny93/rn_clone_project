import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPlayList,
  setStatus,
  togglePlay,
} from '../../actions/currentMusic';
import { instance } from '../../config/server';
import { likePlayList, unLikePlayList } from '../../actions/likedStatus';
import Icon from 'react-native-vector-icons/AntDesign';
import ShuffleIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListDetail({ navigation, route }) {
  const token = useSelector(state => state.setCredential);
  const likedPlayList = useSelector(state => state.setLiked.likedPlayList);
  const [tracks, setTracks] = useState([]);
  const { id, data } = route.params; // 받는곳에서 route.params로 route안의 객체 접근
  const dispatch = useDispatch();

  useEffect(() => {
    // axios(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //   },
    // }).then(res => {
    //   setTracks(res.data.items);
    // });
    getTracks();
  }, [data]);

  const getTracks = async () => {
    const res = await instance.get(`playlists/${data.id}/tracks`);
    setTracks(res.data.items);
  };
  // useEffect(() => {
  //   axios(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   }).then(res => {
  //     setTracks(res.data.items);
  //   });
  // }, [data]);

  const setCurrentMusic = max => {
    let randomIndex = Math.floor(Math.random() * Math.floor(max));
    dispatch(setCurrentPlayList(tracks, randomIndex, data.name));
  };

  const openSongList = () => {
    navigation.navigate('SongList', {
      id: data.id,
      fullList: tracks,
      listTitle: data.name,
    });
  };

  const addToLiked = data => {
    likedPlayList.includes(data)
      ? dispatch(unLikePlayList(data))
      : dispatch(likePlayList(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', paddingTop: 24 }}>
          <Image
            source={{ uri: data.images[0].url }}
            style={{ width: 240, height: 240 }}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={{ color: 'white', paddingBottom: 8, fontSize: 16 }}>
            {data.description}
          </Text>
          <Text
            style={{
              color: '#1DB954',
              fontSize: 20,
              paddingBottom: 20,
              fontWeight: 'bold',
            }}
            onPress={() => Linking.openURL(data.external_urls.spotify)}
          >
            {data.owner.display_name} Link
          </Text>
          <View style={styles.buttonWrapper}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={() => addToLiked(data)}
              >
                <Icon
                  name={likedPlayList.includes(data) ? 'heart' : 'hearto'}
                  size={32}
                  color="white"
                  style={{ paddingRight: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 12 }}>
                <Icon name="ellipsis1" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setCurrentMusic(tracks.length)}>
              <Icon
                name="play"
                size={72}
                color="#1DB954"
                style={{ position: 'relative' }}
              />
              <ShuffleIcon
                name="shuffle-variant"
                size={24}
                color="white"
                style={{ position: 'absolute', bottom: 2, right: -4 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.trackListWrapper}
            onPress={openSongList}
          >
            <View>
              <Text numberOfLines={4} style={{ color: 'white', fontSize: 20 }}>
                {tracks.length > 0
                  ? tracks.slice(0, 10).map((song, index) => {
                      return (
                        <Text key={index}>
                          <Text style={{ color: 'white' }}>
                            {song?.track?.artists[0].name}
                            {'  '}
                          </Text>
                          <Text style={{ color: '#939393' }}>
                            {song?.track?.name} &#8226;{' '}
                          </Text>
                        </Text>
                      );
                    })
                  : ''}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}
                >
                  더 보기...
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* <Text style={{ color: 'white' }}>ListDetailpage</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  innerContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackListWrapper: {
    marginVertical: 36,
    // height: 100,
    // overflow: 'hidden',
  },
});

// List Detail page - Short Detail + certain amount of text songlist (onPress takes to songlist modal);
