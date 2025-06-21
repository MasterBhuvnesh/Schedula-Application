import { Save } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon, Text } from '~/components';

interface UpdateButtonProps {
  isLoading: boolean;
  uploading: boolean;
  onPress: () => void;
}

export function UpdateButton({
  isLoading,
  uploading,
  onPress,
}: UpdateButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.updateButton,
        (isLoading || uploading) && styles.updateButtonDisabled,
      ]}
      onPress={onPress}
      disabled={isLoading || uploading}
    >
      <AppIcon Icon={Save} size={18} color="#fff" />
      <Text style={styles.updateButtonText}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
    gap: 10,
  },
  updateButtonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
