import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function SearchRoot({ navigation }) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    // setInputValue(e.target.value);
    // console.log(inputValue);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, marginLeft: 24 }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>
          검색하기
        </Text>
      </View>

      <View style={styles.searchBarWrapper}>
        <Icon
          name="search1"
          size={28}
          color="black"
          style={{ position: 'absolute', left: 10 }}
        />
        <TextInput
          style={styles.serachBar}
          style={{ fontSize: 24 }}
          value={inputValue}
          placeholder="아티스트, 곡 또는 앨범"
          placeholderTextColor="black"
          onChangeText={e => handleInput(e)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  searchBarWrapper: {
    height: 40,
    backgroundColor: 'white',
    margin: 24,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 44,
    justifyContent: 'center',
    position: 'relative',
  },
  searchBar: {
    // height: 30,
    // fontSize: 30,
  },
});
