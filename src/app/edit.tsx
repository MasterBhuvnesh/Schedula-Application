import { useAuth, useUser } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  EditProfileFormSection,
  ProfileEditImage,
  UpdateButton,
} from '~/components';
import { useToast } from '~/context';
import { useImagePicker } from '~/hooks';
import { BackgroundProvider } from '~/providers';

export default function EditProfileScreen() {
  const { user } = useUser();
  const { isLoaded } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const { pickImage } = useImagePicker();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [profileImage, setProfileImage] = useState(user?.imageUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImagePicker = async () => {
    setUploading(true);
    try {
      const base64Image = await pickImage();
      if (base64Image) {
        setProfileImage(base64Image);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!isLoaded || !user) {
      showToast('User not loaded. Please try again.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      if (profileImage !== user.imageUrl) {
        await user.setProfileImage({ file: profileImage });
      }

      await user.update({ firstName, lastName });

      console.log('Profile updated successfully:'); // Debugging line
      router.back();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      showToast(
        error.errors?.[0]?.message ||
          'Failed to update profile. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundProvider>
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerTitleStyle: { fontFamily: 'Regular', color: '#fff' },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ProfileEditImage
          profileImage={profileImage}
          uploading={uploading}
          isLoading={isLoading}
          onImagePicker={handleImagePicker}
        />

        <EditProfileFormSection
          firstName={firstName}
          lastName={lastName}
          isLoading={isLoading}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
        />

        <UpdateButton
          isLoading={isLoading}
          uploading={uploading}
          onPress={handleUpdateProfile}
        />
      </ScrollView>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 200,
    paddingBottom: 100,
  },
});
