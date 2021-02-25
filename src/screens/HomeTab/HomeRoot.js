import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-navigation';

export default function HomeRoot({ navigation }) {
  const goToListDetail = () => {
    navigation.navigate('ListDetail');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)} // 모바일은 id값을 부여할때 string으로 바꿔서 받아야한다
        // horizontal={true} // horizontal 로만 작성 가능 true라 생략 가능
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        // listEmptyComponent, listHeaderComponent, listFooterComponent
        bounces={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7} // 현업에서 0.7 내지 0.8 사용
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null //네이티브에서는 무조건 ternary로 조건부
        }
      /> */}
      <ScrollView style={styles.wrapper}>
        <View style={styles.upperContent}>
          <TouchableOpacity onPress={goToListDetail}>
            <View style={styles.button}>
              <Text>to ListDetail</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.lowerContent}>
          <Text>이건 어디에나올까</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'center',
    // marginTop: 110,
    // borderTopWidth: 1,
    // borderTopColor: 'blue',
    // borderStyle: 'solid',
  },
  wrapper: {
    backgroundColor: 'blue',
    borderTopColor: 'red',
    borderTopWidth: 2,
  },
  upperContent: {
    flex: 1,
    height: 300,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContent: {
    flex: 1,
    height: 300,
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'skyblue',
    width: 80,
  },
});
