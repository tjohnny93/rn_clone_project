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
import { DATA } from './data';
import MainList from './components/MainList';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-navigation';

export default function HomeRoot({ navigation }) {
  const [data, setdata] = useState(DATA);

  const goToListDetail = () => {
    navigation.navigate('ListDetail');
  };
  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView style={styles.wrapper}>
      <MainList />
      <View style={styles.upperContent}>
        <TouchableOpacity onPress={goToListDetail}>
          <View style={styles.button}>
            <Text>to ListDetail</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContent}>
        <Text style={{ color: 'white' }}>흠...</Text>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'gray',
    // justifyContent: 'center',
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
