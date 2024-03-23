import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Container({ location, name }) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ width: 120, height: 110 }}
          source={require('../assets/Service_Centre.png')}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 17,
              paddingTop: 10,
              fontWeight: 'bold',
              marginBottom: 4,
            }}>
            {name}
          </Text>
          <Image
            style={{ width: 16, height: 16, marginLeft: 7, marginTop: 14 }}
            source={require('../assets/Check.png')}
          />
        </View>
        <Text style={{ fontSize: 15, marginBottom: 4 }}>Location:</Text>
        <Text style={{ fontSize: 15 }}>{location}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 135,
    height: 220,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20
  },
});
