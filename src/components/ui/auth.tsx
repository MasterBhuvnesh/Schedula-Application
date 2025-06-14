import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { GoogleAuth, Text } from '~/components';
import { hp, wp } from '~/utils';

export default function AuthView() {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
      // Logo pop-up animation
      Animated.parallel([
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Content slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Button pop-up with bounce
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScaleAnim, buttonScaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: logoScaleAnim }],
          }}
        >
          <Image
            source={require('@/assets/images/icon.png')}
            contentFit="contain"
            style={styles.logo}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text bold style={{ ...styles.title, color: '#059669' }}>
            Welcome to Schedula
          </Text>
          <Text style={styles.subtitle}>
            Stay updated with the latest events and register instantly. Schedula
            lets you browse upcoming events, view details, and secure your spot
            with a tap.
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.buttonWrapper,
          {
            transform: [{ scale: buttonScaleAnim }],
          },
        ]}
      >
        <GoogleAuth
          buttonStyle={styles.googleButton}
          textStyle={styles.googleButtonText}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',

    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    gap: hp(2),
  },
  logo: {
    width: wp(50),
    height: wp(50),
    marginBottom: 28,
    borderRadius: 24,
    shadowColor: '#000',
  },
  title: {
    fontSize: hp(5.3),
    marginBottom: wp(3.2),
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4.3),
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  googleButton: {
    width: wp(60),
    height: hp(7.5),
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginTop: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: wp(4.3),
    letterSpacing: 0.2,
    paddingLeft: wp(3.2),
  },
});
