import React, { useState } from 'react';
import { useFonts } from "expo-font";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from './../constants/Colors';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleRegister = async () => {
    const { firstName, lastName, email, mobile, password, confirmPassword } = formData;
  
    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.121.251:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.otp) {
          setOtp(data.otp.toString()); // Ensure `otp` is treated as a string
          setUserId(data.userId);
          setShowOtpScreen(true);
        } else {
          Alert.alert('Error', 'No OTP received from the server.');
        }
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  const handleVerifyOtp = () => {
    if (otp && userOtp.trim() === otp.trim()) {
      Alert.alert('Success', 'OTP verified successfully!');
      navigation.navigate('Login'); // Navigate to the Login screen
    } else {
      Alert.alert('Error', 'Invalid OTP.');
    }
  };
  
  useFonts({
    'mulish':require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium':require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold':require('./../assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold':require('./../assets/fonts/Mulish-Bold.ttf'),
    'mulish-black':require('./../assets/fonts/Mulish-Black.ttf')
  })

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
            <TextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              style={styles.input}
              secureTextEntry
            />
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Text style={styles.otpText}>Enter OTP sent to your mobile:</Text>
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
    fontFamily: 'mulish-semibold',
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
    fontFamily: 'mulish-semibold',
    color: '#fff',
    fontSize: 18,
  },
  otpText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
