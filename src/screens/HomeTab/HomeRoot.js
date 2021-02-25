import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
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
      <ScrollView>
        <View style={styles.upperContent}>
          <Text>HomeTab</Text>
        </View>
        <View style={styles.lowerContent}>
          <TouchableOpacity onPress={goToListDetail}>
            <View style={styles.button}>
              <Text>to ListDetail</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: 'gray',
    justifyContent: 'center',
    // borderTopWidth: 1,
    // borderTopColor: 'blue',
    // borderStyle: 'solid',
  },
  upperContent: {
    marginTop: 10,
    borderTopColor: 'red',
    borderTopWidth: 2,

    flex: 1,
    height: 300,
    backgroundColor: 'yellow',
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
