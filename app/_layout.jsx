import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import LoginScreen from './../components/LoginScreen';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';

import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch(err){
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    'mulish':require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium':require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold':require('./../assets/fonts/Mulish-SemiBold.ttf')
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
            headerShown:false
          }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
      
    </ClerkProvider>
  );
}
