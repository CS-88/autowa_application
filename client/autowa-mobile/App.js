import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginScreen';
import React from 'react';
import MainNavigator from './navigation/MainNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainNavigator}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}