import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface OnboardingState {
  isFirstLaunch: boolean | null;
  checkFirstLaunch: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>(set => ({
  isFirstLaunch: null,

  checkFirstLaunch: async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      set({ isFirstLaunch: hasLaunched === null });
    } catch (error) {
      console.error('Failed to read launch status', error);
      set({ isFirstLaunch: false });
    }
  },

  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      set({ isFirstLaunch: false });
    } catch (error) {
      console.error('Failed to mark onboarding complete', error);
    }
  },
}));
