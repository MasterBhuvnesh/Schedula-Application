import { hp } from '@/src/utils';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, Text } from 'react-native';
import { AppIcon } from '~/components';
import { toast } from '~/constants/toast';
import { ToastProps, ToastType } from '~/types/toast.type';

type ColorIntensity = 50 | 100 | 700;

// Utility function to get theme color
const getThemeColor = (type: ToastType, intensity: ColorIntensity) => {
  return toast[type][intensity];
};

// Icon configuration mapping
const iconConfig = {
  success: {
    component: CheckCircle,
    color: getThemeColor('success', 700),
  },
  error: {
    component: XCircle,
    color: getThemeColor('error', 700),
  },
  warning: {
    component: AlertTriangle,
    color: getThemeColor('warning', 700),
  },
  info: {
    component: Info,
    color: getThemeColor('info', 700),
  },
};

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
  textStyle,
  containerStyle,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [iconScaleAnim] = useState(new Animated.Value(0));
  const [iconRotateAnim] = useState(new Animated.Value(0));

  // Get all colors for the current type at once
  // const colors = {
  //   background: getThemeColor(type, 50),
  //   border: getThemeColor(type, 200),
  //   text: getThemeColor(type, 700),
  //   iconBg: getThemeColor(type, 700),
  // };

  //  Custom colors for the toast based on type
  const colors = {
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent white for better visibility
    border: 'rgba(15, 14, 14, 0.37)', // Light border for contrast
    text: getThemeColor(type, 100), // Text color based on type
    iconColor: getThemeColor(type, 700), // Icon color based on type
  };

  const { component: IconComponent } = iconConfig[type];

  useEffect(() => {
    if (visible) {
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(-100);
      scaleAnim.setValue(0.8);
      iconScaleAnim.setValue(0);
      iconRotateAnim.setValue(0);

      // Entrance animation sequence
      Animated.parallel([
        // Main container animations
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 6,
          useNativeDriver: true,
        }),
        // Icon animations with delay
        Animated.sequence([
          Animated.delay(200),
          Animated.parallel([
            Animated.spring(iconScaleAnim, {
              toValue: 1,
              tension: 150,
              friction: 4,
              useNativeDriver: true,
            }),
            Animated.timing(iconRotateAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    // Exit animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(iconScaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          ...containerStyle,
        },
        Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow,
      ]}
    >
      <Animated.View
        style={[
          styles.iconBackground,
          {
            transform: [{ scale: iconScaleAnim }],
          },
        ]}
      >
        <AppIcon
          Icon={IconComponent}
          strokeWidth={2}
          size={16}
          color={colors.iconColor}
        />
      </Animated.View>

      <Animated.View
        style={{
          flex: 1,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text
          style={[
            styles.message,
            {
              color: colors.text,
            },
            textStyle,
          ]}
        >
          {message}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: hp(7),
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },
  message: {
    fontSize: 12,
    fontFamily: 'regular',
    marginLeft: 10,
    flexShrink: 1,
  },
  iconBackground: {
    borderRadius: 10,
    padding: 7,
  },
  androidShadow: {
    elevation: 0,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Toast;
