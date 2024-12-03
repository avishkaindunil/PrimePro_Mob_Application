import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useFonts } from "expo-font";
import React, { useState } from 'react';
import { Colors } from './../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  
      const data = await response.json(); // try to parse JSON
  
      if (response.ok) {
        console.log('Login Success:', data);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userId', data.userId.toString());  // Save userId to AsyncStorage
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('MainTabs');
      } else {
        console.log('Login Failed:', data);
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      // Log full response to debug
      console.error('Full response:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  const onPressGoogle = async () => {
    Alert.alert('Info', 'Google login feature is under development.');
  };

  const onPressRegister = () => {
    navigation.navigate('Signup');
  };

  useFonts({
    'mulish':require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium':require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold':require('./../assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold':require('./../assets/fonts/Mulish-Bold.ttf'),
    'mulish-black':require('./../assets/fonts/Mulish-Black.ttf')
  });

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
    fontWeight: '500',
    fontFamily: 'mulish-bold',
  },
  logo: {
    marginTop: -25,
    width: 200,
    height: 200,
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
    fontWeight: '500',
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
    fontFamily: 'mulish-semibold',
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
    fontFamily: 'mulish-bold',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialText: {
    fontFamily: 'mulish-semibold',
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
    fontFamily: 'mulish-semibold',
  },
  registerTextOne: {
    fontSize: 16,
    fontFamily: 'mulish-semibold',
    color: Colors.PRIMARY,
  },
  registerButton: {
    marginLeft: 5,
  },
}); 
