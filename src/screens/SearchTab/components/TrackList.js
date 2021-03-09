import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const TrackList = ({ data }) => {
  const renderTracks = ({ item, index }) => {
    console.log(item);
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
            source={{ uri: item?.album.images[0].url }}
            style={{ width: 48, height: 48, marginRight: 12, borderRadius: 4 }}
          />
          <View style={{ justifyContent: 'flex-start', width: 180 }}>
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 20 }}>
              {item?.name}
            </Text>
            <Text style={{ color: '#939393', fontSize: 20 }}>
              Single {item?.type}
            </Text>
          </View>
        </View>
        <View style={{}}>
          {/* <Text style={{ color: 'white', position: 'relative' }}>
            {item?.followers?.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text> */}
          <Icon
            name="music-box-multiple"
            size={32}
            color="white"
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
        renderItem={renderTracks}
        keyExtractor={item => String(item.id)}
        bounces={false}
      />
      <Text></Text>
    </View>
  );
};

export default TrackList;
