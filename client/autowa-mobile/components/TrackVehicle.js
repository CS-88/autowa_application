import { View, Text, Image } from 'react-native';

export default function TrackVehicle() {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)', padding: 20 }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 35,
            fontWeight: 'bold',
            paddingTop: 120,
          }}>
          Vehicle Progress
        </Text>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 50 }}>
        <Image
          style={{ height: 162, width: 162 }}
          source={require('../assets/Car_wash.png')}
        />
      </View>
      <View
        style={{
          marginTop: '20%',
          marginLeft: '6%',
          marginRight: '6%',
          height: 40,
          backgroundColor: 'white',
          borderRadius: 30,
          borderWidth: 5,
          borderColor: 'rgb(176, 216, 218)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            width: '25%',
            height: 30,
            backgroundColor: 'rgb(176, 216, 218)',
            borderRadius: 15,
          }}></View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 19,
            fontWeight: 'bold',
          }}>
          25%
        </Text>
      </View>

      <View style={{ paddingTop: '9%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Your Honda Fit is currently in Wash
        </Text>
      </View>
      <View style={{ paddingTop: '9%' }}>
        <Text style={{ fontSize: 17 }}>Vehicle License : SN66 XMZ</Text>
      </View>
      <View>
        <Text style={{ fontSize: 17, flexDirection: 'row' }}>
          Client : Mr. Shenal
        </Text>
      </View>
    </View>
  );
}
