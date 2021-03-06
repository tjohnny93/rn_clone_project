import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AlbumList = ({ data }) => {
  const renderAlbums = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          width: '100%',
          borderRadius: 10,
          padding: 8,
          backgroundColor: '#303030',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: item?.images[1]?.url }}
            style={{ width: 48, height: 48, marginRight: 12, borderRadius: 4 }}
          />
          <View style={{ justifyContent: 'flex-start', width: 180 }}>
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 20 }}>
              {item?.artists[0].name}
            </Text>
            <Text numberOfLines={1} style={{ color: '#939393', fontSize: 20 }}>
              {item?.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Icon
            name="album"
            size={36}
            color="#939393"
            style={{ paddingRight: 28 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#606060',
        height: 220,
      }}
    >
      <FlatList
        data={data}
        renderItem={renderAlbums}
        keyExtractor={item => String(item.id)}
        bounces={false}
      />
      <Text></Text>
    </View>
  );
};

export default AlbumList;
