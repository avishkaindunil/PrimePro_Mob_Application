import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from './../../constants/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './../../components/SignupScreen';
import OtpScreen from './../../components/OtpScreen';
import { useRouter } from 'expo-router';
// import LoginScreen from '../../components/LoginScreen';
const Stack = createNativeStackNavigator();

export default function TabLayout() {
  const router = useRouter(); // Initialize the router

  return (
    <Stack.Navigator initialRouteName="Signup">
      {/* Signup Screen */}
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Sign Up' }}
      />

      {/* OTP Screen */}
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ title: 'Enter OTP' }}
      />

      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      /> */}

      {/* Main Tabs */}
      <Stack.Screen
        name="Tabs"
        component={TabsComponent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabsComponent() {
  const router = useRouter();

  // Example of navigating to Login screen after OTP verification
  const handleVerifyOtp = () => {
    if (otp && userOtp.trim() === otp.trim()) {
      alert('OTP Verified');
      router.push('/Login');  // Navigate to Login
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-ul" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help-support"
        options={{ title: 'Help & Support' }}
      />
      <Tabs.Screen
        name="custom-ratings-feedback"
        options={{ title: 'Custom Ratings & Feedback' }}
      />
    </Tabs>
  );
} 
