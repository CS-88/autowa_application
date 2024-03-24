import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Text, ScrollView, Modal, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getVerifiedEmail } from '../services/LocalStorage';
export default function MyCars() {
  const navigation = useNavigation();
  const [customerObject, setCustomerObject] = useState({});
  const [updatedCustomerObject, setUpdatedCustomerObject] = useState({
    name: '',
    email: '',
    mobile_no: '',
    vehicle_number: '',
    vehicle_model: '',
    mileage: ''
  });
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    handleCustomerFetch();
  }, []);

  const handleCustomerFetch = async () => {
    const apiUrl = 'https://autowa-backend.onrender.com/api/customer/get';
    let customer_email = await getVerifiedEmail();
    console.log(customer_email);


    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: customer_email })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.Error) {
          Alert.alert('Error', 'Something went wrong, please try again later.');
          return;
        }
        setCustomerObject(data);
        setUpdatedCustomerObject(data);
        console.log(data);
      } else {
        Alert.alert('Error', 'Internal Server Error. Please try again Later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  const handleUpdateInfo = async () => {
    const apiUrl = 'https://autowa-backend.onrender.com/api/customer/update';

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCustomerObject)
      });
       console.log(updatedCustomerObject.name);

      if (response.ok) {
        const data = await response.json();
        if (data.Success) {
          Alert.alert('Success', 'Customer info updated successfully.');
        } else {
          Alert.alert('Error', data.Error || 'Something went wrong, please try again later.');
        }
      } else {
        Alert.alert('Error', 'Internal Server Error. Please try again Later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const addImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.cancelled) {
      const imageUri = image.uri || image.assets[0].uri;
      setImage(imageUri);
    }
  };

  const togglePopup = async () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      // Fetch invoice data again when the popup is closed
      await handleCustomerFetch();
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
        <TouchableOpacity onPress={togglePopup} style={styles.buttons}>
          <Text style={{ color: 'white', fontSize: 18 }}>Update Vehicle Info</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showPopup}
        animationType="slide"
        transparent={true}
        onRequestClose={togglePopup}>
        <TouchableWithoutFeedback onPress={togglePopup}>
          <View style={styles.popupContainer}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.popup}>
                <View style={styles.containerImgPopup}>
                  <Image
                    style={styles.logoImgPopup}
                    source={require('../assets/AutoWa-Logo.png')}
                  />
                </View>
                <Text style={styles.popupTextHeader}>Update Customer Info</Text>

                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  onChangeText={(text) => setUpdatedCustomerObject({ ...updatedCustomerObject, name: text })}
                  value={updatedCustomerObject.name}
                />
                <Text style={styles.label}>Email :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={updatedCustomerObject.email}
                />
                <Text style={styles.label}>Mobile No :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mobile no"
                  onChangeText={(text) => setUpdatedCustomerObject({ ...updatedCustomerObject, mobile_no: text })}
                  value={updatedCustomerObject.mobile_no}
                />
                <Text style={styles.label}>Vehicle No:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your vehicle no"
                  onChangeText={(text) => setUpdatedCustomerObject({ ...updatedCustomerObject, vehicle_number: text })}
                  value={updatedCustomerObject.vehicle_number}
                />
                <Text style={styles.label}>Vehicle Model:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your vehicle model"
                  onChangeText={(text) => setUpdatedCustomerObject({ ...updatedCustomerObject, vehicle_model: text })}
                  value={updatedCustomerObject.vehicle_model}
                />
                <Text style={styles.label}>Mileage :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mileage"
                  onChangeText={(text) => setUpdatedCustomerObject({ ...updatedCustomerObject, mileage: text })}
                  value={updatedCustomerObject.mileage}
                />
                <View
                                  style={{
                                    backgroundColor: 'rgb(252, 80, 43)',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginHorizontal: '18%',
                                    marginTop: '12%',
                                    marginBottom: '10%',
                                  }}>
                                  <TouchableOpacity onPress={handleUpdateInfo}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', margin: 5 }}>
                                      Update Info
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </ScrollView>
                          </View>
                        </TouchableWithoutFeedback>
                      </Modal>
                    </>
                  );
                }
                
                const styles = StyleSheet.create({
                  containers: {
                    backgroundColor: 'white',
                    marginHorizontal: '6%',
                    height: 250,
                    borderRadius: 30,
                    marginTop: 120,
                    alignItems: 'center',
                  },
                  buttons: {
                    height: 60,
                    width: 180,
                    backgroundColor: 'rgb(176, 216, 218)',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                  },
                  popupContainer: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  popup: {
                    backgroundColor: 'white',
                    padding: 50,
                    borderRadius: 10,
                    alignItems: 'left',
                  },
                  popupTextHeader: {
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: 40,
                    textAlign: 'center',
                  },
                  containerImgPopup: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    marginRight: 8,
                  },
                  logoImgPopup: {
                    height: 128,
                    width: 128,
                    alignItems: 'center',
                  },
                  label: {
                    fontSize: 16,
                    marginBottom: 5,
                  },
                  input: {
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingLeft: 10,
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
                
