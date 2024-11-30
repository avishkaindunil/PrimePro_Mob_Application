import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function OtpScreen({ route, navigation }) {
  const { mobile } = route.params;
  const [userOtp, setUserOtp] = useState('');

  const handleOtpVerification = async () => {
    try {
      const response = await fetch('http://192.168.103.251:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp: userOtp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP verified successfully!');
        navigation.navigate('(tabs)');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter OTP</Text>
      <TextInput
        placeholder="OTP"
        style={styles.input}
        keyboardType="numeric"
        value={userOtp}
        onChangeText={setUserOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#050C9C', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
