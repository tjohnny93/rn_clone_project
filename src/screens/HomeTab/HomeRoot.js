import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/';
import axios from 'axios';
import base64 from 'base-64';
import { spotify } from '../../config/server';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MainList from './components/MainList';
import { PLAYLIST_DATA } from './simpleData';

export default function HomeRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [categories, setCategories] = useState([]);
  const [playLists, setPlayLists] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
    setPlayLists(PLAYLIST_DATA);
  }, []);

  useEffect(() => {
    token.length !== 0 && getCategroy();
  }, [token]);

  const getToken = async () => {
    await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          base64.encode(spotify.ClientId + ':' + spotify.ClientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    })
      .then(tokenResponse => {
        // setlocalToken(tokenResponse.data.access_token);
        dispatch(fetchToken(tokenResponse.data.access_token));
      })
      .catch(err => {
        console.log('event', err);
      });
  };

  const getCategroy = async () => {
    await axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(res => {
      setCategories(res.data.categories.items.slice(0, 6));
    });

    // spotify api 업데이트 대비용
    // await axios(
    //   'https://api.spotify.com/v1/browse/categories/equal/playlists?locale=sv_US',
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer ' + token,
    //     },
    //   }
    // ).then(res => {
    //   console.log(res.data.playlists.items);
    // });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                {category.name === 'Top Lists' ? 'K-POP' : category.name}
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
