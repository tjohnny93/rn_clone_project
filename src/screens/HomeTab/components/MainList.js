import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const MainList = ({ navigation }) => {
  const renderList = ({ item }) => {
    return (
      <View style={styels.listItemWrapper}>
        <View>
          {/* <Image
            source={{ uri: item.url }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          /> */}
        </View>
        <View>{/* <Text>{item.title}</Text> */}</View>
        <View>
          <Text>{/* {item.description} */}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        {/* <Text>{data.name}</Text> */}
        <Text>리스트 맵돌리는 컴포넌트</Text>
      </View>
      <FlatList
        // data={data}
        renderItem={renderList}
        keyExtractor={item => String(item.id)} // 모바일은 id값을 부여할때 string으로 바꿔서 받아야한다
        horizontal={true} // horizontal 로만 작성 가능 true라 생략 가능
        // showsHorizontalScrollIndicator={false}
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
  listItemWrapper: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // marginTop: 110,
    // borderTopWidth: 1,
    // borderTopColor: 'blue',
    // borderStyle: 'solid',
  },
});
