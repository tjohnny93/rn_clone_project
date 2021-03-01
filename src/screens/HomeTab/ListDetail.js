import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function ListDetail({ navigation, route }) {
  const token = useSelector(state => state.setCredential);
  const { id, data } = route.params; // 받는곳에서 route.params로 route안의 객체 접근
  console.log(data);

  const openSongList = () => {
    navigation.navigate('SongList', { id: id });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{ color: 'white' }}>ListDetailpage</Text>
        <Text style={{ color: 'white' }}>
          동적라우팅 id 이거 사용해서 카테고리 내부 데이터 잘라오기?: {id}
        </Text>
        <TouchableOpacity onPress={openSongList}>
          <Text style={{ color: 'white' }}>노래리스트 버튼</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  innerContainer: {
    paddingTop: 40,
  },
});

// List Detail page - Short Detail + certain amount of text songlist (onPress takes to songlist modal);
