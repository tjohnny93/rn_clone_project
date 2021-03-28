import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayList } from '../../actions/currentMusic';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

const LIMIT = 20;

export default function SongList({ navigation, route }) {
  const token = useSelector(state => state.setCredential);
  const { id, fullList, listTitle } = route.params;
  const [songList, setSongList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getTracks();
  }, []);

  const getTracks = () => {
    if (loading) {
      return;
    }
    setloading(true);

    setSongList([...songList, ...fullList.slice(offset, offset + LIMIT)]);

    setOffset(offset + LIMIT);
    setloading(false);
  };

  const onEndReached = () => {
    getTracks();
  };

  const setCurrentMusic = index => {
    dispatch(setCurrentPlayList(fullList, index, listTitle));
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
              source={{ uri: item?.track?.album.images[1]?.url }}
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
              {item?.track?.name}
            </Text>
            <Text style={{ color: '#939393', fontSize: 16 }}>
              {item?.track?.artists[0].name}
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
      <BlurView
        tint="dark"
        intensity={100}
        style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          {listTitle}
        </Text>
      </BlurView>

      <View style={styles.modalContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          <View style={{ marginVertical: 16 }}></View>
        </View>
      </View>
      <View
        style={{ height: 660, backgroundColor: '#151515', paddingBottom: 80 }}
      >
        <FlatList
          data={songList}
          renderItem={renderTracks}
          initialNumToRender={3}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#151515',
    // backgroundColor: 'white',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
  },
  closeButton: {
    marginVertical: 12,
    marginLeft: 20,
  },
  trackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
