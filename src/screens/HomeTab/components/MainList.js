import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';

const MainList = ({ navigation, data }) => {
  const goToListDetail = (id, data) => {
    navigation.navigate('ListDetail', { id: id, data: data });
  };

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => goToListDetail(item.id, item)}
        style={
          data.length - 1 === index
            ? [styles.listItemWrapper, { marginRight: 16 }]
            : styles.listItemWrapper
        }
        activeOpacity={0.5}
      >
        <View style={styles.categoryImage}>
          {item.images[0].url.length === 0 ? (
            <Icon name="applemusic" size={160} color="white" />
          ) : (
            <Image
              source={{ uri: item.images[0].url }}
              style={{ width: 168, height: 168 }}
            />
          )}
        </View>
        <View style={{ paddingTop: 12, width: 168, height: 48 }}>
          <Text
            numberOfLines={1}
            style={{ color: '#959595', fontWeight: 'bold', fontSize: 16 }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainListWrapper}>
      <FlatList
        data={data}
        renderItem={renderList}
        initialNumToRender={3}
        maxToRenderPerBatch={6}
        keyExtractor={item => String(item.id)} // 모바일은 id값을 부여할때 string으로 바꿔서 받아야한다
        horizontal={true} // horizontal 로만 작성 가능 true라 생략 가능
        showsHorizontalScrollIndicator={false}
        // listEmptyComponent, listHeaderComponent, listFooterComponent
        bounces={false}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.7} // 현업에서 0.7 내지 0.8 사용
      />
    </View>
  );
};

export default MainList;

const styles = StyleSheet.create({
  mainListWrapper: {},

  listItemWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  lastItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
});
