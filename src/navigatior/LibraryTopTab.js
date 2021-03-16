import React from 'react';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPlayList from '../screens/LibraryTab/MyPlayList';
import MyArtist from '../screens/LibraryTab/MyArtist';
import MyAlbum from '../screens/LibraryTab/MyAlbum';

const TopTab = createMaterialTopTabNavigator();

export default function LibraryTopTab({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#212121' }}>
      <View style={{ height: 80 }}>
        <Text
          style={{
            color: 'white',
            marginLeft: 20,
            marginTop: 20,
            fontSize: 40,
            fontWeight: 'bold',
          }}
        >
          음악
        </Text>
      </View>
      <TopTab.Navigator
        initialRouteName="playList"
        initialLayout={{ width: Dimensions.get('window').width }} // materialTopTabNavigator 특성상 이걸 지정 안할시 첫로딩에 화면이 흰색으로 렌더링됨. (필수)
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: '#1db954',
          },
          labelStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#212121',
            marginLeft: 20,
            marginRight: '14%',
          },
          tabStyle: { padding: 0, margin: 0 },
          activeTintColor: 'white',
        }}
      >
        <TopTab.Screen
          name="playList"
          component={MyPlayList}
          options={{
            title: '플레이리스트',
          }}
        />
        <TopTab.Screen
          name="artist"
          component={MyArtist}
          options={{
            title: '아티스트',
          }}
        />
        <TopTab.Screen
          name="album"
          component={MyAlbum}
          options={{
            title: '앨범',
          }}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}
