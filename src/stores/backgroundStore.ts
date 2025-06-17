import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { defaultBackground } from '~/context/background';
import { BackgroundState, BackgroundType } from '~/types/background.type';

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    set => ({
      background: defaultBackground,
      setBackground: async (newBackground: BackgroundType) => {
        set({ background: newBackground });
      },
      loadBackground: async () => {
        // No-op as persist middleware handles this
      },
    }),
    {
      name: 'background-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ background: state.background }),
    }
  )
);
