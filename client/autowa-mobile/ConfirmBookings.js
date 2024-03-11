import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export default function ConfirmBookings() {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(232,232,232)' }}>
      <Text
        style={{
          fontSize: 35,
          textAlign: 'center',
          paddingTop: 120,
          paddingBottom: 60,
        }}>
        KleenPark
      </Text>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 21,
            paddingTop: 15,
          }}>
          <Text style={{ fontSize: 20, paddingTop: 14, marginLeft: '10%' }}>
            Full Service
          </Text>
          <CheckBox
            checked={isChecked1}
            onPress={() => setChecked1(!isChecked1)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 21,
          }}>
          <Text style={{ fontSize: 20, paddingTop: 14, marginLeft: '10%' }}>
            Car Wash
          </Text>
          <CheckBox
            checked={isChecked2}
            onPress={() => setChecked2(!isChecked2)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 21,
          }}>
          <Text style={{ fontSize: 20, paddingTop: 14, marginLeft: '10%' }}>
            Interior Cleaning
          </Text>
          <CheckBox
            checked={isChecked3}
            onPress={() => setChecked3(!isChecked3)}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 80 }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 200,
            backgroundColor: 'rgb(176,216,218)',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: '6%',
    marginRight: '6%',
    height: 220,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
