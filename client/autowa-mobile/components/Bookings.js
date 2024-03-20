import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Container from './Container';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Bookings() {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)', padding: 20 }}>
      <View
        style={{
          paddingTop: 90,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            flex: 1,
            justifyContent: 'center',
            color: 'black',
            height: 50,
            backgroundColor: 'rgba(222, 239, 231, 0.5)',
            borderRadius: 10,
            marginBottom: 18,
            paddingLeft: 15,
            margin: 12,
            marginLeft: 1,
            marginRight: '7%',
          }}
          placeholder="Search"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
        />
        <View style={{ paddingBottom: 6, paddingRight: 10 }}>
          <TouchableOpacity>
            <Icon name="search-sharp" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(222,239,231)',
            height: 30,
            justifyContent: 'center',
            marginBottom: 30,
            width: 100,
            borderRadius: 10,
          }}>
          <Text style={{ textAlign: 'center' }}>Filters</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'rgb(232,232,232)',
          borderRadius: 20,
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <Container />
          <Container />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Container />
          <Container />
        </View>
      </View>
    </View>
  );
}
