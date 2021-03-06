import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function MyArtist({ navigation }) {
  const likedTrack = [];
  const goToSearchTab = () => {
    navigation.navigate('Search');
  };

  const renderPlayList = ({ item, index }) => {
    return <View></View>; // yet to create liked global state for artist
  };

  return likedTrack.length === 0 ? (
    <View style={styles.container}>
      <View
        style={{
          width: '80%',
        }}
      >
        <Text
          numberOfLines={2}
          style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
        >
          고객님이 좋아요 표시하는 아티스트가 여기에 표시됩니다.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => goToSearchTab()}
        style={{
          marginTop: 40,
          width: 200,
          height: 50,
          backgroundColor: '#1db954',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          다른 아티스트 보러가기
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.activeContainer}>
      <Text
        style={{
          justifyContent: 'flex-start',
          marginLeft: 20,
          marginVertical: 30,
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
        }}
      >
        내가 고른 아티스트
      </Text>
      <FlatList
        data={likedTrack}
        style={{ flex: 1, backgroundColor: '#212121', paddingHorizontal: 20 }}
        renderItem={renderPlayList}
        keyExtractor={(item, index) => String(item?.id)}
        bounces={false}
        // ListHeaderComponent={<Text>내가 고른 플레이리스트</Text>}
        numColumns={2}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  activeContainer: {
    flex: 1,
    backgroundColor: '#212121',
  },
});
