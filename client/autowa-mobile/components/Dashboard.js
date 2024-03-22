import { useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text, ScrollView , Modal, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getVerifiedEmail } from '../services/LocalStorage';

export default function Dashboard() {
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  

  const [image, setImage] = useState(null); // Initialize image with null
  let [url, setApiImage] = useState(null); 
  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [status, setStatus] = useState("");
  let [booking_name, setBookingName] = useState("");
  let [customer_special_notes, setCustomerSpecialNotes] = useState("");
  let [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
    fetchApiImage(); // Call fetchApiImage when the component mounts
  }, []);

  const fetchApiImage = async () => {
      // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/customer/get';

      let customer_email = await getVerifiedEmail();
      let name = "";

      let id = "";
      let booking_name = "";
      let customer_special_notes = "";
      let status = "";


      // Prepare the request body
      const requestBody = {
        email: customer_email
      };

      //console.log(requestBody.email + " In home");

      // Send POST request to the backend API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.Error){
              alert('Something went wrong, please try again later.');
              return;
            }
            url = data.url;
            name = data.name
            setApiImage(url);
            setName(name)
          } else {
            // Handle failed login, maybe display an error message to the user
            alert('Internal Server Error. Please try again Later.');
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Error:', error);
        });
    };


    const fetchBookingNotCompleted = async () => {
      // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/booking/get/not/completed';

      let customer_email = await getVerifiedEmail();
      // Prepare the request body
      const requestBody = {
        customer_email: customer_email
      };

      // Send POST request to the backend API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.Error){
              alert('Something went wrong, please try again later.');
              return;
            }
            //console.log(data)
            if(data.length > 0){
              id = data[0].id;
              booking_name = data[0].booking_name;
              customer_special_notes = data[0].customer_special_notes;
              status = data[0].status;

              setId(id);
              setBookingName(booking_name);
              setCustomerSpecialNotes(customer_special_notes);
              setStatus(status);
              return;
            }
            console.log(data)
          } else {
            // Handle failed login, maybe display an error message to the user
            alert('Internal Server Error. Please try again Later.');
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Error:', error);
        });
    };


    const handleCancelBooking = () => {
      // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/booking/set/status';

      // Prepare the request body
      const requestBody = {
        id: id,
        status: "Cancelled"
      };

      // Send POST request to the backend API
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.Error){
              alert('Something went wrong, please try again later.');
              return;
            }
            alert('Order '+ id + ' Cancelled Successfully')
            showPopup = !showPopup
          } else {
            // Handle failed login, maybe display an error message to the user
            alert('Internal Server Error. Please try again Later.');
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Error:', error);
        });
    };


  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));

    if (!_image.canceled) {
      // Extract image URI based on returned object structure (adjust as needed)
      const imageUri = _image.uri || _image.assets[0].uri; // Handle potential 'assets' property
      setImage(imageUri);
    }
  };


  const togglePopup = () => {
    fetchBookingNotCompleted();
    if(id != ""){
      setShowPopup(!showPopup);
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)' }}>
        <View style={styles.container}>
          <View style={imageUploaderStyles.container}>
              {image && ( // Only render Image if image has a valid URI
                <Image
                  source={{ uri: image }}
                  style={{ flex: 1, width: '100%', height: '100%' }}
                />
              )}
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity
                onPress={addImage}
                style={imageUploaderStyles.uploadBtn}>
                <Icon name="camera" size={13} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ marginVertical: 25, fontSize: 16, paddingLeft: 15 }}>
              Hi {name}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 2 }}>
            <Icon name="notifications-outline" size={30} color="black" />
          </View>
        </View>

        <View style={styles.rectangle1}>
        <TouchableOpacity onPress={togglePopup} style={styles.showBookingDetailContainer}>
          <View style={styles.square1Image}>
            {url && ( // Only render Image if image has a valid URI
              <Image
                source={{ uri: url }}
                style={{ width: "350%", height: "100%", flex: 1 }}
              />
            )}
          </View>
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <View style={styles.rectangle2}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 10,
                marginTop: '10%',
              }}>
              24/06/2024
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 8,
                textAlign: 'center',
                marginTop: '23%',
              }}>
              Next Service Date
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.serviceButtons}
              onPress={() => handleButtonPress('TrackVehicle')}>
              <Icon
                style={{ textAlign: 'center', marginTop: '15%' }}
                name="location"
                size={50}
                color="gray"
              />
            </TouchableOpacity>
            <Text style={styles.textBelowButtons}>Track Vehicle</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.serviceButtons}
              onPress={() => handleButtonPress('Invoice')}>
              <Icon
                style={{ textAlign: 'center', marginTop: '15%' }}
                name="newspaper"
                size={50}
                color="gray"
              />
            </TouchableOpacity>
            <Text style={styles.textBelowButtons}>View Invoice</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.serviceButtons}
              onPress={() => handleButtonPress('ServiceRecords')}>
              <Icon
                style={{ textAlign: 'center', marginTop: '15%' }}
                name="clipboard"
                size={50}
                color="gray"
              />
            </TouchableOpacity>
            <Text style={styles.textBelowButtons}>Service Records</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: 'rgb(255,255,255)' }}>
        <Text
          style={{ marginLeft: '6%', marginBottom: '4%', fontWeight: 'bold' }}>
          Latest Offers
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: '5%' }}>
          <View style={styles.offers}>
            <Text>50% off for car wash</Text>
          </View>
          <View style={styles.offers}>
            <Text>10% off on thursdays</Text>
          </View>
          <View style={styles.offers}>
            <Text>30% off on all services</Text>
          </View>
        </ScrollView>
      </View>
      {/* Popup */}
      <Modal
        visible={showPopup}
        animationType="slide"
        transparent={true}
        onRequestClose={togglePopup}>
        <TouchableWithoutFeedback onPress={togglePopup}>
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
            <View style={styles.containerImgPopup}>
              <Image
                style={styles.logoImgPopup}
                source={require('../assets/AutoWa-Logo.png')}
              />
            </View>
              <Text style={styles.popupTextHeader}>Active Booking Status</Text>
              <Text style={styles.popupText}>Booking ID : {id}</Text>
              <Text style={styles.popupText}>Booking Name : {booking_name}</Text>
              <Text style={styles.popupText}>Status : {status}</Text>
              <Text style={styles.popupText}>Customer Name : {name}</Text>
              <Text style={styles.popupText}>Customer Notes : {customer_special_notes}</Text>
              <View
                style={{
                  backgroundColor: 'rgb(252, 80, 43)',
                  alignItems: 'center',
                  borderRadius: 10,
                  padding: 10,
                  marginLeft: '18%',
                  marginRight: '18%',
                  marginTop: '12%',
                  marginBottom: '10%',
                }}>
                <TouchableOpacity title="cancelBooking" onPress={handleCancelBooking}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 5, marginTop: 5, marginLeft: 5, marginRight: 5}}>
                    Cancel Booking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    //elevation: 2,
    height: 70,
    width: 70,
    backgroundColor: '#efefef',
    //position: 'relative',
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
    height: '25%',
    fontSize: '5%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    //padding: 30,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'left',
    flexDirection: 'row',
    marginLeft: '6%',
    marginRight: '6%',
    //justifyContent: 'center',
  },
  rectangle1: {
    marginTop: 50,
    marginLeft: '6%',
    marginRight: '6%',
    height: 100, // specify height
    backgroundColor: 'rgb(176,216,218)', // specify background color
    borderRadius: 20,
    //borderWidth: 2, // specify the border width
    //borderColor: 'black', // specify the border color
    flexDirection: 'row',
  },
  square1: {
    marginLeft: '5%',
    marginTop: '4.5%',
    height: '69%',
    width: '28%',
    backgroundColor: 'white',
    borderRadius: 15, // Adjust as needed
    marginRight: 10, // Space between the square and the rectangle
    //borderWidth: 2, // specify the border width
    //borderColor: 'black', // specify the border color
  },
  square1Image: {
    height: '100%',
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 15, // Adjust as needed
    marginRight: 10, // Space between the square and the rectangle
    //borderWidth: 2, // specify the border width
    //borderColor: 'black', // specify the border color
  },
  showBookingDetailContainer: {
    marginLeft: '5%',
    marginTop: '4.5%',
    height: '69%',
    width: '28%',
    backgroundColor: 'white',
    borderRadius: 15, // Adjust as needed
    marginRight: 10, // Space between the square and the rectangle
    //borderWidth: 2, // specify the border width
    //borderColor: 'black', // specify the border color
  },
  rectangle2: {
    marginLeft: '2%',
    marginTop: '8%',
    marginBottom: '5%',
    height: 30,
    width: '23%',
    backgroundColor: 'white',
    borderRadius: 9, // Adjust as needed
    marginRight: 10, // Space between the square and the rectangle
    //borderWidth: 2, // specify the border width
    //borderColor: 'black', // specify the border color
  },
  verticalLine: {
    height: '100%', // Height matches the height of the rectangle
    width: 2, // Width of the vertical line
    backgroundColor: 'gray',
    marginLeft: '36%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '6.5%',
    marginTop: '30%',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  serviceButtons: {
    width: 80,
    height: 80,
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: 'black',
    backgroundColor: 'rgb(176,216,218)',
  },
  textBelowButtons: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: 'bold',
    color: 'gray',
  },
  offers: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: '5%',
    marginRight: 15,
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
  popupText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
  },
  popupTextHeader: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom :40,
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
});
