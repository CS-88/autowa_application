import { View, Text } from 'react-native';
import Container from './Container';

export default function Bookings() {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(232,232,232)' }}>
      <View>
        <Text
          style={{
            fontSize: 35,
            textAlign: 'center',
            paddingTop: 120,
            paddingBottom: 60,
          }}>
          Bookings
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          paddingBottom: 20,
        }}>
        <Container />
        <Container />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <Container />
        <Container />
      </View>
    </View>
  );
}
