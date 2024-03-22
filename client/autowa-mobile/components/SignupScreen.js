import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true); // State to track email validity
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberValid, setMobileNumberValid] = useState(true); // State to track mobile number validity
    const [mileage, setMileage] = useState('');
    const [mileageValid, setMileageValid] = useState(true); // State to track mileage validity

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailValid(validateEmail(text)); // Validate email as the user types
    };

    const handleMobileNumberChange = (text) => {
        setMobileNumber(text);
        setMobileNumberValid(validateMobileNumber(text)); // Validate mobile number as the user types
    };

    const handleMileageChange = (text) => {
        setMileage(text);
        setMileageValid(validateMileage(text)); // Validate mileage as the user types
    };

    const handleSignUp = () => {
        if (!emailValid) {
            alert('Please enter a valid email address.');
            return;
        }
        // Handle sign up logic here
        // For now, just navigate to home screen
        navigation.navigate('Home');
    };

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validateMobileNumber = (number) => {
        const numberRegex = /^[0-9]*$/;
        return numberRegex.test(number);
    };

    const validateMileage = (mileage) => {
        const mileageRegex = /^[0-9]*$/;
        return mileageRegex.test(mileage);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgb(255,255,255)' }}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/AutoWa-Logo.png')} />
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="rgba(118, 118, 118, 0.7)"
                />
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ flex: 1, color: 'black' }}
                        placeholder="Email"
                        placeholderTextColor="rgba(118, 118, 118, 0.7)"
                        onChangeText={handleEmailChange}
                        value={email}
                    />
                    {email !== '' && ( // Check if email field is not empty
                        <View style={styles.validationIcon}>
                            {emailValid ? (
                                <Text style={{ color: 'green' }}>✓</Text>
                            ) : (
                                <Text style={{ color: 'red' }}>✕</Text>
                            )}
                        </View>
                    )}
                </View>
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ flex: 1, color: 'black' }}
                        placeholder="Mobile Number"
                        placeholderTextColor="rgba(118, 118, 118, 0.7)"
                        onChangeText={handleMobileNumberChange}
                        value={mobileNumber}
                    />
                    {mobileNumber !== '' && ( // Check if mobile number field is not empty
                        <View style={styles.validationIcon}>
                            {mobileNumberValid ? (
                                <Text style={{ color: 'green' }}>✓</Text>
                            ) : (
                                <Text style={{ color: 'red' }}>✕</Text>
                            )}
                        </View>
                    )}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Model"
                    placeholderTextColor="rgba(118, 118, 118, 0.7)"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Number"
                    placeholderTextColor="rgba(118, 118, 118, 0.7)"
                />
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ flex: 1, color: 'black' }}
                        placeholder="Mileage"
                        placeholderTextColor="rgba(118, 118, 118, 0.7)"
                        onChangeText={handleMileageChange}
                        value={mileage}
                    />
                    {mileage !== '' && ( // Check if mileage field is not empty
                        <View style={styles.validationIcon}>
                            {mileageValid ? (
                                <Text style={{ color: 'green' }}>✓</Text>
                            ) : (
                                <Text style={{ color: 'red' }}>✕</Text>
                            )}
                        </View>
                    )}
                </View>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="rgba(118, 118, 118, 0.7)"
                />
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={[styles.loginText, { fontWeight: 'bold' }]}>Login</Text>
                </TouchableOpacity>
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
    input: {
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
    },
    button: {
        backgroundColor: 'rgb(176,216,218)',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '12%',
        marginTop: 20,
    },
    buttonText: {
        textTransform: 'uppercase',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 20,
    },
    loginText: {
        fontSize: 14,
        marginRight: 8,
    },
    validationIcon: {
        paddingRight: 10,
    },
});
