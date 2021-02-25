import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ListDetail({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ListDetailpage</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 110,
  },
});

// List Detail page - Short Detail + certain amount of text songlist (onPress takes to songlist modal);
