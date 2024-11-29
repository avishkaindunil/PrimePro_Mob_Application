import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  const handleOtpVerification = () => {
    // TODO: Verify OTP with backend
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter OTP</Text>
      <TextInput placeholder="OTP" style={styles.input} keyboardType="numeric" onChangeText={setOtp} />
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
