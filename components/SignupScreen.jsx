import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { Colors } from './../constants/Colors';

export default function SignupScreen() {
  const navigation = useNavigation(); // Use the hook to get navigation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });

  const [otp, setOtp] = useState(''); // Store OTP from server
  const [userOtp, setUserOtp] = useState(''); // Store OTP entered by user
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [userId, setUserId] = useState(null); // To store userId for OTP validation

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.103.251:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Registration Successful:', data);
        setOtp(data.otp); // Ensure that this OTP exists in the response
        setUserId(data.userId); // Save userId for OTP validation
        setShowOtpScreen(true); // Show OTP input screen
      } else {
        console.error('Server Error:', data.error);
        alert(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Network or Code Error:', error.message);
      alert('Something went wrong. Please try again later.');
    }
  };
  

  const handleVerifyOtp = () => {
    const trimmedOtp = otp?.toString().trim(); // Convert otp to string before trimming
    const trimmedUserOtp = userOtp?.toString().trim(); // Convert userOtp to string before trimming

    console.log("User OTP: ", trimmedUserOtp); // Log user OTP
    console.log("Server OTP: ", trimmedOtp); // Log server OTP
  
    if (!trimmedUserOtp || !trimmedOtp) {
      Alert.alert("Error", "Please enter and verify OTP correctly.");
      return;
    }
  
    if (trimmedUserOtp === trimmedOtp) {
      console.log("OTP matched!");
      navigation.navigate('Tabs'); // This should work now if navigation is correctly passed
    } else {
      console.log("OTP mismatch!");
      Alert.alert("Invalid OTP.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e7ecff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Join PrimePro and simplify your car care journey</Text>
      </View>

      <View style={styles.container}>
        {!showOtpScreen ? (
          <>
            <TextInput
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Mobile"
              value={formData.mobile}
              onChangeText={(text) => setFormData({ ...formData, mobile: text })}
              style={styles.input}
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Text style={styles.otpText}>Enter OTP sent to your mobile: {otp}</Text>
            <TextInput
              placeholder="OTP"
              value={userOtp}
              onChangeText={(text) => setUserOtp(text)}
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp}>
              <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e7ecff',
    paddingBottom: 20,
    paddingTop: 64,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'mulish-semibold',
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'mulish-semibold',
    color: '#8F8E8E',
  },
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    paddingLeft: 12,
    marginVertical: 8,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  otpText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
