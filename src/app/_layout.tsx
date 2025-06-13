import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Loader } from '~/components';
import { useCustomFonts, useFrameworkReady, useTheme } from '~/hooks';
import { BackgroundProvider, ToastProvider } from '~/providers';

export default function RootLayout() {
  useFrameworkReady();

  const { loaded, error } = useCustomFonts();
  const { loadTheme } = useTheme();
  useEffect(() => {
    const hideNavigationBar = async () => {
      await NavigationBar.setVisibilityAsync('hidden');
      await NavigationBar.setBehaviorAsync('overlay-swipe');
    };

    hideNavigationBar();
  }, []);
  useEffect(() => {
    if (loaded || error) {
      loadTheme();
    }
  }, [loaded, error, loadTheme]);

  if (!loaded && !error) {
    return <Loader />;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <BackgroundProvider>
        <ToastProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack>
        </ToastProvider>
      </BackgroundProvider>
    </ClerkProvider>
  );
}
