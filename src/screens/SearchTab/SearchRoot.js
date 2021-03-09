import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import { useRoute } from '@react-navigation/native';

const SEARCH_API = `https://api.spotify.com/v1/search?query=`;
const DATA_TYPE = ['artist', 'track', 'album'];

export default function SearchRoot({ navigation }) {
  const token = useSelector(state => state.setCredential);
  const [inputValue, setInputValue] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const textInputRef = useRef(false);
  const route = useRoute();
  const focused = navigation.isFocused();

  useEffect(() => {
    const clear = navigation.addListener('focus', () => {
      setInputValue('');
      setArtists([]);
      setTracks([]);
      setAlbums([]);
    });
    return clear;
  }, [navigation]);
  // console.log(tracks);

  const modifyInput = val => {
    let modifiedVal = val
      .split('')
      .map(char => {
        return char === ' ' ? '+' : char; // ' ' === '%20' || "+"
      })
      .join('');
    return modifiedVal;
  };

  const getData = async (val, type) => {
    await axios(
      SEARCH_API + `${val}&offset=0&limit=10&type=${type}`,
      // `name:${val}&type=album,track,artist&offset=0&limit=5&type=${type}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    )
      .then(res => {
        switch (type) {
          case 'artist':
            setArtists(res.data.artists.items);
          // console.log(artists);
          case 'track':
            setTracks(res.data.tracks.items);
          // console.log(tracks);
          case 'album':
            setAlbums(res.data.albums.items);
          // console.log(albums);
          default:
            return null;
        }
      })
      .catch(err => {
        // console.log(err);
        // err === 400 ?
      });
  };

  const getSearchResult = val => {
    DATA_TYPE.map(type => {
      getData(val, type);
    });
    // /getData(val, DATA_TYPE[0]);
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
          {/* {console.log(albums)} */}
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
    // alignItems: 'flex-start',
    // justifyContent: 'center',
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
  searchBar: {
    // height: 30,
    // fontSize: 30,
  },
  searchTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
});
