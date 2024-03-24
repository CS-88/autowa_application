import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, Alert, ScrollView , TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';  
import { getVerifiedEmail } from '../services/LocalStorage';

export default function ConfirmBookings() {

  const route = useRoute();
  const { email } = route.params;

  let [isChecked1, setChecked1] = useState(false);
  let [isChecked2, setChecked2] = useState(false);
  let [isChecked3, setChecked3] = useState(false);
  let [isChecked4, setChecked4] = useState(false);

  let [centerEmail, setCenterEmail] = useState("");
  let [centerName, setCenterName] = useState("");
  let [centerMobileNo, setCenterMobileNo] = useState("");
  let [centerDescription, setCenterDescription] = useState("");
  let [centerAboutUs, setCenterAboutUs] = useState("");
  let [centerLocation, setCenterLocation] = useState("");
  let [centerOpenDays, setCenterOpenDays] = useState("");
  let [centerOpenHours, setCenterOpenHours] = useState("");
  let [centerRating, setCenterRating] = useState("");
  let [centerObject, setCenterObject] = useState("");

  let [customerName, setCustomerName] = useState("");
  let [customerEmail, setCustomerEmail] = useState("");
  let [customerVehicleNo, setCustomerVehicleNo] = useState("");
  let [customerSpecialNotes, setCustomerSpecialNotes] = useState("");

  useEffect(() => {
    fetchCustomer(); // Call fetchApiImage when the component mounts
  }, []);


  const fetchCustomer = async () => {
      // Define your backend API endpoint
      const customerUrl = 'https://autowa-backend.onrender.com/api/customer/get';
      const centerUrl = 'https://autowa-backend.onrender.com/api/serviceCenter/get/email';


      // Send POST request to the backend API
      fetch(centerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : email})
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.Error){
              console.log('Something went wrong, please try again later.');
              return;
            }
            await setCenterName(data.name)
            await setCenterMobileNo(data.mobile_no);
            await setCenterDescription(data.description);
            await setCenterAboutUs(data.about_us)
            await setCenterLocation(data.location);
            await setCenterOpenDays(data.open_days);
            await setCenterOpenHours(data.open_hours);
            await setCenterRating(data.rating);
            await setCenterObject(data)

          } else {
            // Handle failed login, maybe display an error message to the user
            alert('Internal Server Error. Please try again Later.');
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Error:', error);
        });


      let customer_email = await getVerifiedEmail();
      
      await setCustomerEmail(customer_email);

      await setCenterEmail(email);

      // Send POST request to the backend API
      fetch(customerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : customer_email})
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.Error){
              console.log('Something went wrong, please try again later.');
              return;
            }
            await setCustomerName(data.name)
            await setCustomerVehicleNo(data.vehicle_number);
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



    const confirmBooking = async () => {
      // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/booking/create';

      var time = new Date();
      let startTime = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true })


      // Prepare the request body
      let requestBody = {
        id:"",
        date: new Date().toLocaleDateString(),
        start_time:startTime,
        end_time: "",
        status: "Pending",
        booking_name : "",
        decline_note : "none",
        service_center_note : "none",
        service_center_email : centerEmail,
        customer_name : customerName,
        customer_email : customerEmail,
        customer_vehicle_number : customerVehicleNo,
        customer_special_notes : customerSpecialNotes,
        review_number : "0",
        review_message : "none",
        service: {
          car_wash: {
            status: isChecked1,
            fee: centerObject.car_wash.fee
          },
          // wash_vacum: {
          //   status: isChecked2,
          //   fee:centerObject.wash_vacum.fee
          // },
          wash_and_interior_clean_up: {
            status: isChecked3,
            fee: centerObject.wash_and_interior_clean_up.fee
          },
          full_service: {
            status: isChecked4,
            fee: centerObject.full_service.fee
          }
        }
      } 

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
            console.log("Hi")
            
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



  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(232,232,232)' , alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingTop: 120,
          paddingBottom: 50
        }}>
        {centerName}
      </Text>

      <ScrollView style={{flex:1}}>
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
            marginTop: 20,
            flexWrap: 'wrap',
          }}>

          <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        Mobile : {centerMobileNo}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        Description : {centerDescription}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        About Us : {centerAboutUs}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        Location : {centerLocation}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        Open Days : {centerOpenDays}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '5%',
        }}>
        Open Hours : {centerOpenHours}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingBottom: '10%',
        }}>
        Rating : {centerRating}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 21,
          }}>
          <Text style={{ fontSize: 20, paddingTop: 14, marginLeft: '10%' }}>
            Vacum & Car Wash
          </Text>
          <CheckBox
            checked={isChecked4}
            onPress={() => setChecked4(!isChecked4)}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'left',
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingTop: '10%',
        }}>
        Special Note
      </Text>
      <TextInput
            style={{
              justifyContent: 'center',
              color: 'black',
              height: 60,
              backgroundColor: 'rgb(217,217,217)',
              borderRadius: 10,
              marginBottom: 0,
              paddingLeft: 15,
              margin: 12,
              marginLeft: '6%',
              marginRight: '6%',
              width: '88%',
            }}
            placeholder="Special Notes..."
            placeholderTextColor="rgba(118, 118, 118, 0.7)"
            onChangeText={setCustomerSpecialNotes}
          />
      <View style={{ alignItems: 'center', paddingTop: 50, paddingBottom: 50 , width: '100%'}}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 200,
            backgroundColor: 'rgb(176,216,218)',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto'
          }}
           onPress={confirmBooking}>
          <Text style={{ fontSize: 20, color: 'white' }}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: '4%',
    marginRight: '6%',
    paddingBottom: '6%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
