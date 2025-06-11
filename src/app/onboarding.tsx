import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import File from '@/assets/images/file.svg';

export default function PermissionOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permissions, setPermissions] = useState({
    camera: false,
    media: false,
  });

  const steps = [
    {
      title: 'Camera Access',
      description:
        'We need camera access to scan QR codes and take photos for your schedule management',
      icon: 'camera',
      permission: 'camera',
    },
    {
      title: 'Media Library',
      description:
        'Allow access to save QR codes and images to your photo gallery',
      icon: 'images',
      permission: 'media',
    },
  ];

  const requestPermission = async (type: string) => {
    try {
      let granted = false;

      switch (type) {
        case 'camera':
          if (!cameraPermission?.granted) {
            const result = await requestCameraPermission();
            granted = result?.granted || false;
          } else {
            granted = true;
          }
          break;

        case 'media':
          const { status: mediaStatus } =
            await MediaLibrary.requestPermissionsAsync();
          granted = mediaStatus === 'granted';
          break;
      }

      setPermissions(prev => ({ ...prev, [type]: granted }));

      // Move to next step or finish
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await completeOnboarding();
      }

      return granted;
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      return false;
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      router.replace('/(tabs)' as any);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      router.replace('/(tabs)' as any);
    }
  };

  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {/* <Ionicons
            name={currentStepData.icon as any}
            size={80}
            color="#007AFF"
          /> */}
          <File width={120} height={120} />
          {/* <Image
            source={require('@/assets/images/file.svg')}
            style={{ width: 120, height: 120 }}
          /> */}
        </View>

        <Text style={styles.title}>{currentStepData.title}</Text>
        <Text style={styles.description}>{currentStepData.description}</Text>

        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => requestPermission(currentStepData.permission)}
        >
          <Text style={styles.buttonText}>Allow Access</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={skipStep}>
          <Text style={styles.secondaryButtonText}>
            {currentStep === steps.length - 1
              ? 'Skip & Continue'
              : 'Skip for now'}
          </Text>
        </TouchableOpacity>

        <View style={styles.steps}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep && styles.activeStepDot,
                index < currentStep && styles.completedStepDot,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e22',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
    lineHeight: 24,
    marginBottom: 20,
  },
  stepIndicator: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  stepText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 6,
  },
  activeStepDot: {
    backgroundColor: '#007AFF',
    transform: [{ scale: 1.2 }],
  },
  completedStepDot: {
    backgroundColor: '#4CAF50',
  },
});
