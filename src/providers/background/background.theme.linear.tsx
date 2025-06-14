/*
THEME LINEAR BACKGROUND PROVIDER
THIS COMPONENT IS A PROVIDER THAT USES DEFINED THEME WITH LINEAR GRADIENT AS A BACKGROUND. 
[Theme can be changed by user in settings]
CASES:
1. It applies a linear gradient background using the theme colors.
2. It adds a dark overlay on top of the gradient.
*/

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '~/hooks';
import { BackgroundProviderProps } from '~/types/background.type';

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const { colors: themecolors } = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          themecolors[700],
          themecolors[800],
          themecolors[900],
          themecolors[950],
          '#000000',
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.8, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
      />
      <View style={styles.darkOverlay} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
