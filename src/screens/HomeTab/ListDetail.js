import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListDetail({ navigation }) {
  return (
    <View>
      <Text>ListDetailpage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// List Detail page - Short Detail + certain amount of text songlist (onPress takes to songlist modal);
