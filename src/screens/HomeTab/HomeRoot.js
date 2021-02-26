import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import { DATA } from './data';
import { SIMPLE_DATA } from './simpleData';
import MainList from './components/MainList';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-navigation';

export default function HomeRoot({ navigation }) {
  const [categoryData, setdata] = useState(SIMPLE_DATA);

  const goToListDetail = () => {
    navigation.navigate('ListDetail');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {categoryData.map(category => {
        return <MainList data={category} navigation={navigation} />;
      })}
      <MainList data={categoryData[0]} navigation={navigation} />
      <TouchableOpacity onPress={goToListDetail}>
        <View style={styles.button}>
          <Text>to ListDetail</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    backgroundColor: '#212121',
  },
  button: {
    backgroundColor: 'skyblue',
    width: 80,
  },
});
