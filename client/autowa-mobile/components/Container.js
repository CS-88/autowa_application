import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Container() {
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
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
            Kleen Park
          </Text>
          <Image
            style={{ width: 16, height: 16, marginLeft: 7, marginTop: 14 }}
            source={require('../assets/Check.png')}
          />
        </View>
        <Text style={{ fontSize: 15, marginBottom: 4 }}>Location:</Text>
        <Text style={{ fontSize: 15 }}>Colombo</Text>
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
  },
});
