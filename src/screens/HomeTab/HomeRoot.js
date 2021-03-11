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
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import MainList from './components/MainList';
import { PLAYLIST_DATA } from '../../config/simpleData';

export default function HomeRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [categories, setCategories] = useState([]);
  const [playLists, setPlayLists] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
    // setPlayLists(PLAYLIST_DATA);
  }, []);

  useEffect(() => {
    token.length !== 0 && getCategory();
  }, [token]);

  // useEffect(() => {
  //   categories.length !== 0 && getPlaylistsData(categories);
  // }, [categories]);

  const getToken = async () => {
    await axios(TOKEN_REQUEST_API, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
    // setCategories(res.data.categories.items.slice(0, 6));
    await getPlaylistsData(res.data.categories.items);
  };

  const getPlaylist = async id => {
    const res = await instance
      .get(
        // `browse/categories/${id}/playlists?country=US`
        `browse/categories/${id}/playlists?country=KR`
      )
      .catch(err => null);
    return res;
  };

  const getPlaylistsData = async categories => {
    const playlistRequest = categories?.map(category =>
      getPlaylist(category.id)
    );
    // console.log(playlistRequest);
    // const categoriesId = categories?.map(category => category.id);
    // console.log(categoriesId);
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {categories.map(category => {
        return (
          <View key={category.id}>
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
                {category.name}
              </Text>
              <Image
                source={{ uri: category.icons[0].url }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </View>
            <MainList
              data={playLists[category.id]}
              selectedCategory={category.name}
              navigation={navigation}
            ></MainList>
          </View>
        );
      })}
      <View style={{ padding: 16 }}></View>
    </ScrollView>
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
