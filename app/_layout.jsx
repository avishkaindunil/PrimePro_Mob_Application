import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
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
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'mulish': require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium': require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold': require('./../assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold': require('./../assets/fonts/Mulish-Bold.ttf'),
    'mulish-black': require('./../assets/fonts/Mulish-Black.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }} />
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false }} />
      </SignedOut>
    </ClerkProvider>
  );
}
