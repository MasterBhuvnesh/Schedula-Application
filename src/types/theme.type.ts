export type ThemeType = 'Amber' | 'Emerald' | 'Sky' | 'Rose' | 'Zinc';

export interface Theme {
  name: ThemeType;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export interface ThemeState {
  theme: ThemeType;
  setTheme: (newTheme: ThemeType) => void;
  loadTheme: () => void;
}
