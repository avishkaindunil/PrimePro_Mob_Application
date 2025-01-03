import React from 'react';
import { useFonts } from "expo-font";
// import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './../components/LoginScreen';
import OtpScreen from './../components/OtpScreen';
import SignupScreen from './../components/SignupScreen';
import TabLayout from './(tabs)/_layout'; // Main tab layout
import NearestCenter from './../components/NearestService';
import AppointmentBookings from './../components/AppoinmentBooking';
// import { Slot } from 'expo-router';
import HelpSupport from './help-support/index';
import CustomRatings from './custom-ratings-feedback/index';

const Stack = createStackNavigator();

export default function RootLayout() {
  useFonts({
    'mulish':require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium':require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold':require('./../assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold':require('./../assets/fonts/Mulish-Bold.ttf'),
    'mulish-black':require('./../assets/fonts/Mulish-Black.ttf')
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: true, title: 'OTP Verification' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: true, title: 'Sign Up' }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearestService"
          component={NearestCenter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppointmentBooking"
          component={AppointmentBookings}
          options={{ headerShown: true, title: 'Appointment Booking' }}
        />

        <Stack.Screen
          name="help-support"
          component={HelpSupport}
          options={{ headerShown: false}}
        />

        <Stack.Screen
          name="custom-ratings"
          component={CustomRatings}
          options={{ headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
