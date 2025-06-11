import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';

const CustomLoader = ({ visible = true }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  return (
    <Animated.View style={[styles.loaderContainer, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#27272a', '#18181b', '#09090b', '#000000']}
        style={StyleSheet.absoluteFill}
        start={{ x: 1.7, y: 0.4 }}
        end={{ x: 1, y: 0 }}
      />
      <ActivityIndicator size="large" color="#ffffff" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
