import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const ArtistList = ({ data }) => {
  const renderArtists = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          width: '100%',
          borderRadius: 5,
          padding: 8,
          backgroundColor: '#303030',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: item.images[1].url }}
            style={{ width: 48, height: 48, marginRight: 12, borderRadius: 4 }}
          />
          <View style={{ justifyContent: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{item.name}</Text>
            <Text style={{ color: '#939393', fontSize: 20 }}>{item.type}</Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={{ color: 'white', position: 'relative' }}>
            {item.followers.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <Icon
            name="heart"
            size={12}
            color="#1DB954"
            style={{ position: 'absolute', left: -16, top: 3 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ borderBottomWidth: 1 }}>
      <FlatList
        data={data}
        renderItem={renderArtists}
        keyExtractor={item => String(item.id)}
        bounces={false}
      />
      <Text></Text>
    </View>
  );
};

export default ArtistList;
