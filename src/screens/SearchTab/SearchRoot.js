import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import { useRoute } from '@react-navigation/native';
import { instance } from '../../config';

export default function SearchRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [inputValue, setInputValue] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const textInputRef = useRef(false);
  const route = useRoute();
  // const focused = navigation.isFocused();

  useEffect(() => {
    const clear = navigation.addListener('focus', () => {
      setInputValue('');
      setArtists([]);
      setTracks([]);
      setAlbums([]);
    });
    return clear;
  }, [navigation]);

  const modifyInput = val => {
    let modifiedVal = val
      .split('')
      .map(char => {
        return char === ' ' ? '+' : char; // ' ' === '%20' || "+"
      })
      .join('');
    return modifiedVal;
  };

  const getSearchResult = async val => {
    const res = await instance.get(
      `search?query=${val}&type=artist%2Ctrack%2Calbum&offset=0&limit=8`
    );
    const result = res => {
      setArtists(res.data.artists.items);
      setTracks(res.data.tracks.items);
      setAlbums(res.data.albums.items);
    };
    return result(res).catch(err => {
      console.log(err);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 20, marginLeft: 24 }}>
        {textInputRef.current.isFocused ? (
          <></>
        ) : (
          <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>
            검색하기
          </Text>
        )}
      </View>

      <View style={styles.searchBarWrapper}>
        <Icon
          name="search1"
          size={28}
          color="black"
          style={{ position: 'absolute', left: 14 }}
        />
        <TextInput
          style={styles.serachBar}
          style={{ fontSize: 20 }}
          value={inputValue}
          placeholder="아티스트, 곡 또는 앨범"
          placeholderTextColor="black"
          ref={textInputRef}
          onChangeText={e => setInputValue(e)} //%20 || + === space
          onChange={() => getSearchResult(modifyInput(inputValue))}
        ></TextInput>
      </View>
      {artists.length + albums.length + tracks.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 252,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              position: 'relative',
            }}
          >
            {'       '}검색을 해보세요.
          </Text>
          <Icon
            name="search1"
            size={28}
            color="white"
            style={{ position: 'absolute', left: 112 }}
          />
        </View>
      ) : (
        <></>
      )}
      {artists.length > 0 ? (
        <View
          style={{
            marginHorizontal: 24,
            marginBottom: 12,
          }}
        >
          <Text style={styles.searchTitle}>아티스트 검색 결과</Text>
          <ArtistList data={artists} />
        </View>
      ) : (
        <></>
      )}
      {albums.length > 0 ? (
        <View
          style={{
            marginHorizontal: 24,
            marginBottom: 12,
          }}
        >
          <Text style={styles.searchTitle}>앨범 검색 결과</Text>
          <AlbumList data={albums} />
        </View>
      ) : (
        <></>
      )}
      {tracks.length > 0 ? (
        <View
          style={{
            marginHorizontal: 24,
            marginBottom: 12,
          }}
        >
          <Text style={styles.searchTitle}>트랙 검색 결과</Text>
          <TrackList data={tracks} />
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  searchBarWrapper: {
    height: 52,
    backgroundColor: 'white',
    margin: 24,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingLeft: 52,
    justifyContent: 'center',
    position: 'relative',
  },
  searchBar: {},
  searchTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
});
