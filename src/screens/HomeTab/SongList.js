import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

export default function SongList({ navigation, route }) {
  const { id } = route.params;
  const [songList, setSongList] = useState([]);

  const closeModal = () => {
    navigation.goBack();
  };

  // useEffect(() => {
  //   fetch(
  //     '주소'.then(result => {
  //       setSongList(result);
  //     })
  //   );
  // }, []);

  return (
    <View>
      <View
        style={{ height: 40, backgroundColor: 'rgba(33, 33, 33, 0.8)' }}
      ></View>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>
            X
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//SongList Modal with InfiniteScroll

const styles = StyleSheet.create({
  modalContainer: {
    height: 100,
    // marginTop: 32,
    backgroundColor: '#212121',
  },
  closeButton: {
    width: 80,
    // height: 40,
    paddingTop: 20,
    paddingLeft: 20,
  },
});
