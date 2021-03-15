import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/';
import axios from 'axios';
import {
  TOKEN_REQUEST_API,
  TOKEN_AUTH,
  instance,
  CATEGORY_URL,
} from '../../config';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MainList from './components/MainList';

export default function HomeRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [categories, setCategories] = useState([]);
  const [playLists, setPlayLists] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    token.length !== 0 && getCategory();
  }, [token]);

  const getToken = async () => {
    await axios(TOKEN_REQUEST_API, {
      headers: {
        Authorization: TOKEN_AUTH,
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    })
      .then(tokenRes => {
        dispatch(fetchToken(tokenRes.data.access_token));
        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${tokenRes.data.access_token}`;
      })
      .catch(err => {
        console.log('token err', err);
      });
  };

  const getCategory = async () => {
    const res = await instance.get(CATEGORY_URL);
    setCategories(res.data.categories.items);
    await getPlaylistsData(res.data.categories.items);
  };

  const getPlaylist = async id => {
    const res = await instance
      .get(`browse/categories/${id}/playlists?country=KR`)
      .catch(err => null);
    return res;
  };

  const getPlaylistsData = async categories => {
    const playlistRequest = categories?.map(category =>
      getPlaylist(category.id)
    );

    await axios.all(playlistRequest).then(
      axios.spread((...responses) => {
        for (let i = 0; i < responses.length; i++) {
          setPlayLists(prevPlayList => {
            return {
              ...prevPlayList,
              [categories[i].id]: responses[i].data.playlists.items,
            };
          });
        }
      })
    );
  };

  const renderCategories = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 28,
              color: 'white',
              fontWeight: 'bold',
              paddingBottom: 28,
              marginHorizontal: 16,
            }}
          >
            {item.name}
          </Text>
          <Image
            source={{ uri: item.icons[0].url }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
        <MainList
          data={playLists[item.id]}
          selectedCategory={item.name}
          navigation={navigation}
        ></MainList>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategories}
        keyExtractor={item => String(item.id)}
        bounces={false}
        initialNumToRender={2}
        maxToRenderPerBatch={4}
        // windowSize={11}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    backgroundColor: '#212121',
  },
  button: {
    backgroundColor: 'skyblue',
    width: 80,
  },
});
