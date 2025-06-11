import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PermissionsTab() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permissions, setPermissions] = useState({
    camera: false,
    media: false,
  });

  useEffect(() => {
    checkPermissions();
  }, [cameraPermission]);

  const checkPermissions = async () => {
    try {
      const mediaStatus = await MediaLibrary.getPermissionsAsync();

      setPermissions({
        camera: cameraPermission?.granted || false,
        media: mediaStatus.granted,
      });
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const handleRequestCameraPermission = async () => {
    try {
      if (!cameraPermission?.granted) {
        const result = await requestCameraPermission();

        if (result?.granted) {
          Alert.alert('Success', 'Camera permission granted!');
          setPermissions(prev => ({ ...prev, camera: true }));
        } else {
          Alert.alert(
            'Permission Denied',
            'Camera permission was denied. You can enable it in Settings.'
          );
        }
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const requestMediaPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissions(prev => ({ ...prev, media: status === 'granted' }));

      if (status === 'granted') {
        Alert.alert('Success', 'Media library permission granted!');
      } else {
        Alert.alert(
          'Permission Denied',
          'Media library permission was denied. You can enable it in Settings.'
        );
      }
    } catch (error) {
      console.error('Error requesting media permission:', error);
      Alert.alert('Error', 'Failed to request media permission');
    }
  };

  const PermissionCard = ({
    title,
    description,
    icon,
    granted,
    onPress,
  }: {
    title: string;
    description: string;
    icon: string;
    granted: boolean;
    onPress: () => void;
  }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons
          name={icon as any}
          size={24}
          color={granted ? '#4CAF50' : '#666'}
        />
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>App Permissions</Text>
          <Text style={styles.subtitle}>
            Manage your app permissions to ensure all features work properly
          </Text>
        </View>

        <View style={styles.content}>
          <PermissionCard
            title="Camera Access"
            description="Required to scan QR codes and take photos"
            icon="camera"
            granted={permissions.camera}
            onPress={handleRequestCameraPermission}
          />
          <PermissionCard
            title="Media Library"
            description="Needed to save QR codes and images to your gallery"
            icon="images"
            granted={permissions.media}
            onPress={requestMediaPermission}
          />
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={checkPermissions}
          >
            <Ionicons name="refresh" size={20} color="#007AFF" />
            <Text style={styles.refreshButtonText}>Refresh Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  requestButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  requestButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  refreshButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
