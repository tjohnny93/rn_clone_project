import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { getTracks } from '../../actions/currentMusic';
import Icon from 'react-native-vector-icons/Fontisto';

export default function MyPlayList({ navigation }) {
  const dispatch = useDispatch();
  const likedPlayList = useSelector(state => state.setLiked.likedPlayList);

  const goToHomeTab = () => {
    navigation.navigate('Home');
  };

  const playRandom = (id, listTitle) => {
    dispatch(getTracks(id, listTitle));
  };

  const renderPlayList = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 160,
            margin: 16,
          }}
        >
          <TouchableOpacity onPress={() => playRandom(item.id, item.name)}>
            <Image
              source={{ uri: item?.images[0]?.url }}
              style={{
                width: 160,
                height: 160,
                marginBottom: 24,
                position: 'relative',
                borderRadius: 8,
              }}
            />
            <Icon
              name="play"
              size={40}
              color="#1db954"
              style={{ position: 'absolute', bottom: 8, right: -12 }}
            />
            <Icon
              name="random"
              size={16}
              color="white"
              style={{ position: 'absolute', bottom: 10, right: -6 }}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {item.name}
          </Text>
        </View>
      </View>
    );
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
        내가 고른 플레이리스트
      </Text>
      <FlatList
        data={likedPlayList}
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
