import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function MyPlayList({ navigation }) {
  const likedPlayList = useSelector(state => state.setLiked.likedPlayList);
  const goToHomeTab = () => {
    navigation.navigate('Home');
  };

  return likedPlayList.length === 0 ? (
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
          고객님이 좋아요 표시하는 플레이리스트가 여기에 표시됩니다.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => goToHomeTab()}
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
          플레이리스트 보러가기
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
});
