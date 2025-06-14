import { color } from '~/constants/colors';
import { themes } from '~/context/theme';
import { useThemeStore } from '~/stores/themeStore';
import { ThemeType } from '~/types/theme.type';

export const useTheme = () => {
  const { theme, setTheme, loadTheme } = useThemeStore();

  const currentTheme = themes[theme];
  const currentColors = color[theme];

  const getColor = (shade: keyof (typeof color)[ThemeType]) => {
    return currentColors[shade];
  };

  return {
    theme,
    setTheme,
    loadTheme,
    currentTheme,
    colors: currentColors,
    getColor,
  };
};
