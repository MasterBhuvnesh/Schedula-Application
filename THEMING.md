# Theming System Documentation

## Overview

This project uses a comprehensive theming system built with Zustand for state management and AsyncStorage for persistence.

## Available Themes

- **Emerald**: Default green theme
- **Amber**: Warm yellow/orange theme
- **Sky**: Cool blue theme
- **Rose**: Pink/red theme

## Usage

### Using the useTheme Hook (Recommended)

```tsx
import { useTheme } from '~/hooks/useTheme';

const MyComponent = () => {
  const { theme, setTheme, colors, getColor } = useTheme();

  return (
    <View style={{ backgroundColor: colors[400] }}>
      <Text>Current theme: {theme}</Text>
      <TouchableOpacity
        onPress={() => setTheme('Amber')}
        style={{ backgroundColor: getColor(500) }}
      >
        <Text>Switch to Amber</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Direct Store Access

```tsx
import { useThemeStore } from '~/utils/themeStore';

const MyComponent = () => {
  const { theme, setTheme, loadTheme } = useThemeStore();

  // Load theme on component mount
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <View>
      <Text>Current theme: {theme}</Text>
    </View>
  );
};
```

### Accessing Colors Directly

```tsx
import { color } from '~/constants/colors';

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: color[theme][400] }}>
      <Text>Themed background</Text>
    </View>
  );
};
```

## Color Palette

Each theme includes 11 color shades (50-950):

- **50**: Lightest shade
- **100-400**: Light to medium shades
- **500**: Base color (most commonly used)
- **600-900**: Dark shades
- **950**: Darkest shade

## Theme Persistence

Themes are automatically saved to AsyncStorage and restored when the app restarts. The theme is loaded in the root layout component.

## Type Safety

The system is fully TypeScript typed:

- `ThemeType`: Union type of available theme names
- `Theme`: Interface for theme objects
- `ThemeState`: Zustand store interface

## Best Practices

1. Use the `useTheme()` hook for most cases
2. Load the theme in your root component or early in the app lifecycle
3. Use the 500 shade as your primary color
4. Use lighter shades (50-400) for backgrounds
5. Use darker shades (600-950) for text and borders
