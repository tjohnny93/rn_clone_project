import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/';
import axios from 'axios';
import {
  TOKEN_REQUEST_API,
  TOKEN_AUTH,
  instance,
  CATEGORY_URL,
} from '../../config/server';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MainList from './components/MainList';
import { PLAYLIST_DATA } from '../../config/simpleData';

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
    token.length !== 0 && getCategory();
  }, [token]);

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
    setCategories(res.data.categories.items.slice(0, 6));
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
