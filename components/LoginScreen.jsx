import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Colors } from './../constants/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from './../hooks/UseWarmUpBrowser';
import { useNavigation } from '@react-navigation/native';  // Add this import

export default function LoginScreen() {
  useWarmUpBrowser();
  const navigation = useNavigation();  // Initialize the navigation hook
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = () => {
    console.log(`Login with Username: ${username} and Password: ${password}`);
  };

  const onPressGoogle = async () => {
    // Google OAuth logic
  };

  const onPressRegister = () => {
    // Navigating to the Signup screen
    navigation.navigate('Signup');
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#e7ecff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Image source={require('./../assets/images/Transparent.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Your <Text style={{ color: Colors.PRIMARY }}>Trusted Partner</Text> in Car Care</Text>
        <Text style={styles.description}>
          PrimePro connects you with top car wash and vehicle services. {'\n'}
          Find, book, and manage with ease.
        </Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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

        {/* Add the Register button */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don’t have an account?</Text>
          {/* Add the onPress method for navigation to SignupScreen */}
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
    fontFamily:'mulish-semibold',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily:'mulish-medium',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
  },
  input: {
    fontFamily:'mulish-medium',
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
    fontFamily:'mulish-semibold',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialText: {
    fontFamily:'mulish-medium',
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
  madeInLK: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'mulish-medium',
    fontSize: 14,
  },
  appVersion: {
    marginLeft: 12,
    marginTop: 20,
    fontFamily: 'mulish-medium',
    fontSize: 14,
    color: '#888',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerTextOne: {
    fontSize: 16,
    fontFamily: 'mulish-medium',
    color: Colors.PRIMARY,
  },
  registerButton: {
    fontSize: 16,
    fontFamily: 'mulish-semibold',
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
});
