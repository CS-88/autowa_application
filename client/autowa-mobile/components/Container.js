import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Container({ location, name, email, rating }) {

  const navigation = useNavigation();

  console.log(location, rating)

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName,{email: email});
  };

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => handleButtonPress('ConfirmBookings')}>
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
        <Text style={{ fontSize: 15, marginBottom: 4, marginTop : 4 }}>Rating:</Text>
        <Text style={{ fontSize: 15 }}>{rating}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 165,
    height: 290,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20
  },
});