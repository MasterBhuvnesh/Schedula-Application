import { color } from '~/constants/colors';
import { Theme, ThemeType } from '~/types/theme.type';

export const themes: Record<ThemeType, Theme> = {
  Amber: {
    name: 'Amber',
    colors: color.Amber,
  },
  Emerald: {
    name: 'Emerald',
    colors: color.Emerald,
  },
  Sky: {
    name: 'Sky',
    colors: color.Sky,
  },
  Rose: {
    name: 'Rose',
    colors: color.Rose,
  },
  Zinc: {
    name: 'Zinc',
    colors: color.Zinc,
  },
};

export const defaultTheme: ThemeType = 'Emerald';
