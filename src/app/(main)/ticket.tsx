/* eslint-disable */

// ONCE THE USER DENIED HE CAN STILL USE THE BUTTON TO REQUEST PERMISSION AGAIN
// CAN USE TOGGLE FOR GRANTED & DENIED

import { BackgroundProvider } from '@/src/providers';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Camera, ImageIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcon, Text } from '~/components';
import { useToast } from '~/context';
import { wp } from '~/utils';

export default function PermissionsTab() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const [permissions, setPermissions] = useState({
    camera: false,
    media: false,
  });

  const checkPermissions = useCallback(async () => {
    try {
      const mediaStatus = await MediaLibrary.getPermissionsAsync();

      setPermissions({
        camera: cameraPermission?.granted || false,
        media: mediaStatus.granted,
      });
    } catch (error) {
      showToast?.('Failed to check permissions.', 'error');
    }
  }, [cameraPermission]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await checkPermissions();
    setRefreshing(false);
  }, [checkPermissions]);

  useEffect(() => {
    checkPermissions();
  }, [cameraPermission]);

  const handleRequestCameraPermission = async () => {
    try {
      if (!cameraPermission?.granted) {
        const result = await requestCameraPermission();
        if (result?.granted) {
          showToast?.('Camera permission granted!', 'success');
          setPermissions(prev => ({ ...prev, camera: true }));
        } else {
          showToast?.(
            'Camera permission denied. Enable it in settings.',
            'warning'
          );
        }
      }
    } catch (error) {
      showToast?.('Failed to request camera permission', 'error');
    }
  };

  const requestMediaPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissions(prev => ({ ...prev, media: status === 'granted' }));

      if (status === 'granted') {
        showToast?.('Media library permission granted!', 'success');
      } else {
        showToast?.(
          'Media permission denied. Enable it in settings.',
          'warning'
        );
      }
    } catch (error) {
      showToast?.('Failed to request media permission', 'error');
    }
  };

  const PermissionCard = ({
    title,
    description,
    Icon,
    granted,
    onPress,
  }: {
    title: string;
    description: string;
    Icon: any;
    granted: boolean;
    onPress: () => void;
  }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <AppIcon Icon={Icon} size={20} color={granted ? '#4CAF50' : '#555'} />
        <Text style={styles.cardTitle}>{title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: granted ? '#4CAF50' : '#FF6B6B' },
          ]}
        >
          <Text style={styles.statusText}>
            {granted ? 'Granted' : 'Denied'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      {!granted && (
        <TouchableOpacity style={styles.requestButton} onPress={onPress}>
          <Text style={styles.requestButtonText}>Request Permission</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <BackgroundProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PermissionCard
          title="Camera Access"
          description="Required to scan QR codes and take photos"
          Icon={Camera}
          granted={permissions.camera}
          onPress={handleRequestCameraPermission}
        />
        <PermissionCard
          title="Media Library"
          description="Needed to save QR codes and images to your gallery"
          Icon={ImageIcon}
          granted={permissions.media}
          onPress={requestMediaPermission}
        />
      </ScrollView>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    width: wp(90),
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    width: wp(90),
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    marginLeft: 12,
    flex: 1,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 13,
    color: '#444',
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
