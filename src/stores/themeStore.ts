import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { defaultTheme } from '~/context/theme';
import { ThemeState, ThemeType } from '~/types/theme.type';

export const useThemeStore = create<ThemeState>(set => ({
  theme: defaultTheme,

  setTheme: async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      set({ theme: newTheme });
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  },

  loadTheme: async () => {
    try {
      const storedTheme = (await AsyncStorage.getItem(
        'theme'
      )) as ThemeType | null;
      if (
        storedTheme &&
        ['Amber', 'Emerald', 'Sky', 'Rose', 'Zinc'].includes(storedTheme)
      ) {
        set({ theme: storedTheme });
      } else {
        set({ theme: defaultTheme });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      set({ theme: defaultTheme });
    }
  },
}));
