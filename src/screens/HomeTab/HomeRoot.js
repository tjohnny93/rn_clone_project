import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/';
import axios from 'axios';
import base64 from 'base-64';
import { spotify } from '../../server';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import MainList from './components/MainList';
import { PLAYLIST_DATA } from './simpleData';

export default function HomeRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [categories, setCategories] = useState([]);
  const [playLists, setPlayLists] = useState({});
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchToken);
  //   axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   }).then(res => {
  //     console.log(res.data.categories.items);
  //     setCategories(res.data.categories.items);
  //   });
  // }, []);
  // console.log(token);

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          base64.encode(spotify.ClientId + ':' + spotify.ClientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then(tokenResponse => {
      dispatch(fetchToken(tokenResponse.data.access_token.toString()));
    });
    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(res => {
      setCategories(res.data.categories.items.slice(0, 6));
    });

    setPlayLists(PLAYLIST_DATA);

    // CATEGORIES_ID.map(ele => {
    //   axios(
    //     `https://api.spotify.com/v1/browse/categories/${ele.id}/playlists?limit=10`,
    //     {
    //       method: 'GET',
    //       headers: { Authorization: 'Bearer ' + token },
    //     }.then(res => {
    //       ele.setCall(res);
    //     })
    //   );
    // });

    // axios(
    //   `https://api.spotify.com/v1/browse/categories/pop/playlists?limit=8`,
    //   {
    //     method: 'GET',
    //     headers: { Authorization: 'Bearer ' + token },
    //   }
    // ).then(res => {
    //   console.log(res.data.playlists.items);
    //   // setPlayList(res.data.playlist.items);
    // });
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {categories.map(category => {
        return (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 28,
                  color: 'white',
                  fontWeight: 'bold',
                  paddingBottom: 20,
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
              localToken={token}
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
