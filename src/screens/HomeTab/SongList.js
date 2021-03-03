import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentMusic,
  setCurrentPlayList,
} from '../../actions/currentMusic';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

const LIMIT = 20;

export default function SongList({ navigation, route }) {
  const token = useSelector(state => state.setCredential);
  const { id } = route.params;
  const [songList, setSongList] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getTracks();
  }, []);

  const getTracks = async () => {
    if (loading) {
      return;
    }
    setloading(true);

    const response = await axios(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const result = await response;

    setSongList([
      ...songList,
      ...result.data.items.slice(offset, offset + LIMIT),
    ]);
    setFullList(result.data.items);
    setOffset(offset + LIMIT);
    setloading(false);
  };

  const onEndReached = () => {
    getTracks();
  };

  const setCurrentMusic = index => {
    // dispatch(setCurrentMusic(song));

    dispatch(setCurrentPlayList(fullList, index));
  };

  const renderTracks = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#212121',
          marginHorizontal: 16,
          marginVertical: 8,
          paddingRight: 16,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => setCurrentMusic(index)}
          style={styles.trackWrapper}
        >
          <View>
            <Image
              source={{ uri: item.track.album.images[1]?.url }}
              style={{
                width: 72,
                height: 72,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                marginRight: 8,
              }}
            />
            <Icon
              name="controller-play"
              size={32}
              color="white"
              style={{ position: 'absolute', top: 20, left: 20 }}
            />
          </View>
          <View style={{ width: 240 }}>
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 16 }}>
              {item.track.name}
            </Text>
            <Text style={{ color: '#939393', fontSize: 16 }}>
              {item.track.artists[0].name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Icon name="dots-three-horizontal" size={20} color="#939393" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{ height: 40, backgroundColor: 'rgba(33, 33, 33, 0.8)' }}
      ></View>
      {/* <Modal> */}
      <View style={styles.modalContainer}>
        <View>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text
              style={{
                color: 'white',
                fontSize: 32,
                fontWeight: 'bold',
                textAlignVertical: 'center',
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ height: 660, backgroundColor: '#151515', paddingBottom: 80 }}
      >
        {/* {songList.length > 0 ? ( */}
        <FlatList
          data={songList}
          renderItem={renderTracks}
          keyExtractor={(item, index) => String(index)}
          bounces={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
          ListHeaderComponent={
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                paddingLeft: 16,
                marginBottom: 8,
              }}
            >
              포함
            </Text>
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" style={{ paddingTop: 20 }} />
            ) : null
          }
        />
        {/* ) : null} */}
      </View>

      {/* </Modal> */}
    </View>
  );
}

//SongList Modal with InfiniteScroll

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#151515',
    // backgroundColor: 'white',
  },
  closeButton: {
    width: 80,
    // height: 40,
    marginVertical: 12,
    marginLeft: 20,
  },
  trackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
