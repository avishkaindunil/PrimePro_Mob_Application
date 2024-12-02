import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Colors } from './../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const onPressLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }

    try {
      const response = await fetch('http://192.168.103.251:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Success:', data);
        await AsyncStorage.setItem('userEmail', email); // Save email for use in Home screen
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('MainTabs');
      } else {
        console.log('Login Failed:', data);
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  // Function to handle Google login (not implemented yet)
  const onPressGoogle = async () => {
    Alert.alert('Info', 'Google login feature is under development.');
  };

  // Function to navigate to the signup screen
  const onPressRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e7ecff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Image source={require('./../assets/images/Transparent.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Your <Text style={{ color: Colors.PRIMARY }}>Trusted Partner</Text> in Car Care
        </Text>
        <Text style={styles.description}>
          PrimePro connects you with top car wash and vehicle services. {'\n'}
          Find, book, and manage with ease.
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.btn} onPress={onPressLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.socialText}>Or Login with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity onPress={onPressGoogle} style={styles.iconButton}>
            {/* Add Google OAuth logic */}
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don’t have an account?</Text>
          <TouchableOpacity style={styles.registerButton} onPress={onPressRegister}>
            <Text style={styles.registerTextOne}>Register</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'mulish-semibold',
  },
  logo: {
    width: 160,
    height: 160,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'mulish-semibold',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'mulish-medium',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
  },
  input: {
    fontFamily: 'mulish-medium',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
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
  socialText: {
    fontFamily: 'mulish-medium',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    fontFamily: 'mulish-medium',
  },
  registerTextOne: {
    fontSize: 16,
    fontFamily: 'mulish-medium',
    color: Colors.PRIMARY,
  },
  registerButton: {
    marginLeft: 5,
  },
}); 
