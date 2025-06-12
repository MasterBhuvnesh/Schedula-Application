import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Loader } from '~/components';
import { useCustomFonts, useTheme } from '~/hooks';
import { BackgroundProvider, ToastProvider } from '~/providers';

export default function RootLayout() {
  const { loaded, error } = useCustomFonts();
  const { loadTheme } = useTheme();

  useEffect(() => {
    if (loaded || error) {
      loadTheme();
    }
  }, [loaded, error, loadTheme]);

  if (!loaded && !error) {
    return <Loader />;
  }

  return (
    <BackgroundProvider>
      <ToastProvider>
        <StatusBar style="light" />
        <Slot />
      </ToastProvider>
    </BackgroundProvider>
  );
}
