import { Image } from 'expo-image';
import { Camera } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppIcon, Text } from '~/components';
import { wp } from '~/utils';

interface ProfileEditImageProps {
  profileImage: string;
  uploading: boolean;
  isLoading: boolean;
  onImagePicker: () => void;
}

export function ProfileEditImage({
  profileImage,
  uploading,
  isLoading,
  onImagePicker,
}: ProfileEditImageProps) {
  return (
    <View style={styles.imageSection}>
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('@/assets/images/icon.png')
          }
          style={styles.profileImage}
        />
        {uploading && (
          <View style={styles.uploadingOverlay}>
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )}
      </View>

      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity
          style={[styles.imageButton, styles.primaryButton]}
          onPress={onImagePicker}
          disabled={uploading || isLoading}
        >
          <AppIcon Icon={Camera} size={16} color="#fff" />
          <Text style={styles.primaryButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: wp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: wp(80),
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 20,
  },
  primaryButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 13,
  },
});
