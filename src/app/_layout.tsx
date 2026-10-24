import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// Hide splash screen when ready
SplashScreen.hideAsync().catch(() => {});

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
