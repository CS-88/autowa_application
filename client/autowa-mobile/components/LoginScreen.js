import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { getVerifiedEmail, setVerifiedEmail } from '../services/LocalStorage';
  
  export default function LoginScreen({ navigation }) {
    const buttonText1 = 'Log in';
    const buttonText2 = 'Sign in with Google';
    const buttonText3 = 'Sign up';
    const indexOfG = buttonText2.indexOf('G');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
      // Define your backend API endpoint
      const apiUrl = 'https://autowa-backend.onrender.com/api/auth/login/mobile';

      // Prepare the request body
      const requestBody = {
        email: email,
        password: password
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
            if(data.Error === "Email or Password is Incorrect"){
              alert('Invalid email or password. Please try again.');
              return;
            }
            await setVerifiedEmail(data.email);
            //console.log(await getVerifiedEmail())
            navigation.navigate('Home');
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

    const handleSignUp = () => {
      navigation.navigate('SignUp');
    }; 
  
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgb(255,255,255)',
        }}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/AutoWa-Logo.png')}
          />
        </View>
  
        <View>
          <TextInput
            style={{
              justifyContent: 'center',
              color: 'black',
              height: 40,
              backgroundColor: 'rgb(217,217,217)',
              borderRadius: 10,
              marginBottom: 0,
              paddingLeft: 15,
              margin: 12,
              marginLeft: '12%',
              marginRight: '12%',
            }}
            placeholder="Email"
            placeholderTextColor="rgba(118, 118, 118, 0.7)"
            onChangeText={setEmail}
            value='shenal@gmail.com'
          />
          <TextInput
            style={{
              justifyContent: 'center',
              color: 'black',
              height: 40,
              backgroundColor: 'rgb(217,217,217)',
              borderRadius: 10,
              marginBottom: 0,
              paddingLeft: 15,
              margin: 12,
              marginLeft: '12%',
              marginRight: '12%',
            }}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="rgba(118, 118, 118, 0.7)"
            onChangeText={setPassword}
            value='user123'

          />
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: '15%',
                marginTop: 8,
                marginBottom: 8,
                fontSize: 11,
              }}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
  
        <View>
          <View
            style={{
              backgroundColor: 'rgb(176,216,218)',
              alignItems: 'center',
              borderRadius: 10,
              padding: 10,
              marginLeft: '38%',
              marginRight: '38%',
            }}>
            <TouchableOpacity title="Login" onPress={handleLogin}>
              <Text>
                <Text style={{ textTransform: 'uppercase' }}>L</Text>
                {buttonText1.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          </View>
  
          <View
            style={{
              borderBottomWidth: 2.5,
              borderBottomColor: 'rgb(217,217,217)',
              marginLeft: '20%',
              marginRight: '20%',
              marginVertical: 13,
            }}></View>
  
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(217, 217, 217)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 10,
                marginLeft: '12%',
                marginRight: '12%',
                flexDirection: 'row',
              }}
              onPress={() => {
                alert('Sign in with Google pressed!');
              }}>
              <Image
                source={require('../assets/Google-Icon.png')}
                style={{ width: 19, height: 19, marginRight: 10 }}
              />
              <Text>
                <Text style={{ textTransform: 'uppercase' }}>
                  {buttonText2[0]}
                </Text>
                {buttonText2.slice(1, indexOfG).toLowerCase()}
                {buttonText2.slice(indexOfG, indexOfG + 1).toUpperCase()}
                {buttonText2.slice(indexOfG + 1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 2.5,
              borderBottomColor: 'rgb(217,217,217)',
              marginLeft: '20%',
              marginRight: '20%',
              marginVertical: 13,
            }}></View>
  
          <Text style={{ textAlign: 'center', marginBottom: 8, fontSize: 13 }}>
            Don't have an Account Yet ?
          </Text>
  
          <View
            style={{
              backgroundColor: 'rgb(176,216,218)',
              alignItems: 'center',
              borderRadius: 10,
              padding: 10,
              marginTop: 15,
              marginLeft: '38%',
              marginRight: '38%',
            }}>
            <TouchableOpacity title="SignUp" onPress={handleSignUp}>
              <Text>
                <Text style={{ textTransform: 'uppercase' }}>S</Text>
                {buttonText3.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginRight: 8,
    },
    logo: {
      height: 228,
      width: 228,
      alignItems: 'center',
    },
  });
  