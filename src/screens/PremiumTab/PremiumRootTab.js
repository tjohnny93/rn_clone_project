import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export default function PremiumRootTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Melodify Premium</Text>
      <Icon
        name="applemusic"
        size={240}
        color="#1DB954"
        style={{ padding: 4, marginTop: 32, marginBottom: 60 }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>더 많은 컨텐츠를 즐기기 원하신다면</Text>
        <Text style={{ ...styles.text, marginTop: 12 }}>
          오늘 Melodify Premium에 가입하세요.
        </Text>
      </View>
      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          가입하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#1db954',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 52,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signUpBtn: {
    width: '50%',
    height: 60,
    backgroundColor: '#1DB954',
    marginTop: 52,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});
