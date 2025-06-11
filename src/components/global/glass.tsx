import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface GlassmorphismProps extends ViewProps {
  transparency?: number; // 0-1 (0 = fully transparent, 1 = opaque)
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  tint?: 'light' | 'dark';
  children?: React.ReactNode;
}

const Glassmorphism: React.FC<GlassmorphismProps> = ({
  transparency = 0.05,
  borderRadius = 20,
  borderWidth = 1,
  borderColor = 'rgba(255, 255, 255, 0.18)',
  tint = 'dark',
  children,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <BlurView
        intensity={tint === 'dark' ? 80 : 20}
        tint={tint}
        style={[
          styles.blurView,
          {
            borderRadius,
            backgroundColor:
              tint === 'dark'
                ? `rgba(0, 0, 0, ${transparency})`
                : `rgba(255, 255, 255, ${transparency})`,
            borderWidth,
            borderColor,
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  blurView: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default Glassmorphism;
