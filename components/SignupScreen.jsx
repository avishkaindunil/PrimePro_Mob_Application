import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../constants/Colors';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });

  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState(''); // To store OTP entered by user
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [userId, setUserId] = useState(null); // To store the userId for verification

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.103.251:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setOtp(data.otp); // Set OTP from server response
        setUserId(data.userId); // Save userId for OTP validation
        setShowOtpScreen(true); // Show OTP input screen
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (userOtp === otp) {
      // OTP matched, navigate to Home
      navigation.navigate('Home');
    } else {
      alert('Invalid OTP');
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
    fontFamily: 'mulish-medium',
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'mulish-medium',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    fontFamily: 'mulish-semibold',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  otpText: {
    fontFamily: 'mulish-medium',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});
