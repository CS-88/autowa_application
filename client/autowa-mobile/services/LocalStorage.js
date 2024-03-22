import AsyncStorage from '@react-native-async-storage/async-storage';

export const setVerifiedEmail = async (email) => {
  try {
    await JSON.stringify(AsyncStorage.setItem('verifiedEmail', email));
  } catch (error) {
    console.error('Error storing verified email:', error);
  }
};

export const getVerifiedEmail = async () => {
  try {
    const email = await AsyncStorage.getItem('verifiedEmail');
    return email;
  } catch (error) {
    console.error('Error retrieving verified email:', error);
    return null;
  }
};

