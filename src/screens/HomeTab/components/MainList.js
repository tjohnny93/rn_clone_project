import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const MainList = ({ navigation, data, selectedCategory, localToken }) => {
  const goToListDetail = (id, data) => {
    navigation.navigate('ListDetail', { id: id, data: data });
  };

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => goToListDetail(item.id, item)}
        style={styles.listItemWrapper}
        activeOpacity={0.5}
      >
        <View style={styles.categoryImage}>
          <Image
            // source={{ uri: item.icons[0].url }}
            source={{ uri: item.images[0].url }}
            style={{ width: 168, height: 168 }}
          />
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#959595', fontWeight: 'bold' }}>
            {/* {item.subCategory_name} */}
            {item.name}
          </Text>
        </View>
        <View>
          <Text>{/* {item.description} */}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainListWrapper}>
      <FlatList
        // data={genres}
        data={data}
        // data={playList}
        renderItem={renderList}
        keyExtractor={item => String(item.id)} // 모바일은 id값을 부여할때 string으로 바꿔서 받아야한다
        horizontal={true} // horizontal 로만 작성 가능 true라 생략 가능
        showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        // listEmptyComponent, listHeaderComponent, listFooterComponent
        bounces={false}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.7} // 현업에서 0.7 내지 0.8 사용
        // ListFooterComponent={
        //   loading ? <ActivityIndicator size="large" /> : null //네이티브에서는 무조건 ternary로 조건부
        // }
      />
    </View>
  );
};

export default MainList;

const styles = StyleSheet.create({
  mainListWrapper: {},

  listItemWrapper: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    // marginTop: 110,
    // borderTopWidth: 1,
    // borderTopColor: 'blue',
    // borderStyle: 'solid',
  },
});
