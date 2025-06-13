import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function useCustomFonts() {
  const [loaded, error] = useFonts({
    regular: require('@/assets/fonts/Product Sans Regular.ttf'),
    bold: require('@/assets/fonts/Product Sans Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}
