import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function OtpScreen() {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();  // Initialize navigation

  const handleVerifyOtp = () => {
    // OTP verification logic (you can add your backend verification here)
    console.log(`Verifying OTP: ${otp}`);
    console.log('Current routes: ', navigation.getState().routes); // Debugging current routes
  
    // Navigate to the Login screen after OTP is verified
    navigation.navigate('Login');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleVerifyOtp} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
