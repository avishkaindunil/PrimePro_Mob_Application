import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import LoginScreen from './../components/LoginScreen';

export default function RootLayout() {
  useFonts({
    'mulish':require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium':require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold':require('./../assets/fonts/Mulish-SemiBold.ttf')
  })
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
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
