import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './../components/LoginScreen';   // Ensure correct import path
import OtpScreen from './../components/OtpScreen';       // Ensure correct import path
import SignupScreen from './../components/SignupScreen'; // Ensure correct import path
// import TabLayout from './(tabs)/_layout';  // Add this import to include the Tabs layout

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Stack Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        
        {/* Include TabLayout as the main tabs screen after login */}
        {/* <Stack.Screen name="Tabs" component={TabLayout} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Tabs" component={TabLayout} /> Added Tabs screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
