import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MyCars() {
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const [image, setImage] = useState(null); // Initialize image with null

  const addImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(image));

    if (!image.canceled) {
      // Extract image URI based on returned object structure (adjust as needed)
      const imageUri = image.uri || image.assets[0].uri; // Handle potential 'assets' property
      setImage(imageUri);
    }
  };
  return (
    <>
      <View style={styles.containers}>
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <View style={imageUploaderStyles.container}>
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120 }}
            />
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity
                onPress={addImage}
                style={imageUploaderStyles.uploadBtn}>
                <Icon name="camera" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{ textAlign: 'center', paddingTop: 12, fontSize: 20 }}>
          Toyota Prius
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18 }}>mileage: </Text>
          <Text style={{ fontSize: 18 }}>10,470km</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 150 }}>
        <TouchableOpacity
          onPress={() => handleButtonPress('ServiceRecords')}
          style={styles.buttons}>
          <Text style={{ color: 'white', fontSize: 18 }}>Service Records</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 30 }}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: 'white', fontSize: 18 }}>Update Vehicle Info</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: 'white',
    marginLeft: '6%',
    marginRight: '6%',
    height: 250,
    borderRadius: 30,
    marginTop: 120,
  },
  buttons: {
    height: 60,
    width: 180,
    backgroundColor: 'rgb(176,216,218)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    backgroundColor: '#efefef',
    borderRadius: 999,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '20%',
    fontSize: '5%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
