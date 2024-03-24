import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Container from './Container';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Bookings() {

  let [searchQuery, setSearchQuery] = useState('');
  let [filterByRating, setFilterByRating] = useState(false);

  let [serviceCenterArray,setServiceCenterArray] = useState([]);

  useEffect(() => {
    handleSearchByName(); // Call fetchApiImage when the component mounts
  }, []);
  
  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };


  const handleSearchByName = async () => {
    // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/serviceCenter/get';

      // Send POST request to the backend API
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            if(data.length == 0){
              alert('No Records Found!');
              return;
            }
            setServiceCenterArray(data);
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

  


   const handleSearch = async () => {
    try {
      // Constructing the URL based on searchQuery and filterByRating
      let url = 'https://autowa-backend.onrender.com/api/serviceCenter/get/';

      if(filterByRating){
        // Send POST request to the backend API
        fetch(url+'rating', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify()
        })
          .then(async response => {
            if (response.ok) {
              const data = await response.json();
              setServiceCenterArray(data);
              return
            } else {
              // Handle failed login, maybe display an error message to the user
              alert('Internal Server Error. Please try again Later.');
            }
          })
          .catch(error => {
            // Handle network errors
            console.error('Error:', error);
          });
      }
      else {
        let flag = /^[A-Za-z\s]*$/.test(searchQuery)
        if(!flag){
          alert('Please enter only letters to search by name!');
        }
        else{
          // Send POST request to the backend API
          fetch(url+'name', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name : searchQuery})
          })
            .then(async response => {
              if (response.ok) {
                let data = await response.json();
                if(data.length == 0){
                alert('No Records Found!');
                  return;
                }
                setServiceCenterArray(data);
                return
              } else {
                // Handle failed login, maybe display an error message to the user
                alert('Internal Server Error. Please try again Later.');
              }
            })
            .catch(error => {
              // Handle network errors
              console.error('Error:', error);
            });
            return
        }
      }
      alert('Something went wrong please try again later!')
      return;
      // You can add further processing or set state based on the data received
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };


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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={{ paddingBottom: 6, paddingRight: 10 }}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search-sharp" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      

       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={{backgroundColor: 'rgb(222,239,231)', height: 30, justifyContent: 'center', width: 100, borderRadius: 10, marginRight: 20}}>
          <Text style={{ textAlign: 'center' }}>Filter By</Text>
      </View>
        <TouchableOpacity
          onPress={() => setFilterByRating(false)}
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, marginRight: 5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            {filterByRating ? null : <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'black' }} />}
          </View>
          <Text>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterByRating(true)}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, marginRight: 5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            {filterByRating ?  <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'black' }} /> : null}
          </View>
          <Text>Rating</Text>
        </TouchableOpacity>
      </View>

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
          {serviceCenterArray.map(serviceCenter => (
            <Container key={serviceCenter._id}  location={serviceCenter.location} name={serviceCenter.name} email={serviceCenter.email}/> // Assuming Container component needs a unique key prop
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
