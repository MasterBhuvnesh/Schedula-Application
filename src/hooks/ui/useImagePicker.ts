import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { useToast } from '~/context';

export function useImagePicker() {
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showToast(
          'Please enable camera roll permissions in settings.',
          'warning'
        );
      }
    })();
  }, [showToast]);

  const convertImageToBase64 = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists && fileInfo.size && fileInfo.size > 2 * 1024 * 1024) {
        showToast('Image size must be less than 2MB.', 'error');
        return null;
      }

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      showToast('Failed to process image. Please try again.', 'error');
      return null;
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const manipulatedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500, height: 500 } }],
          { compress: 0.7, format: SaveFormat.JPEG }
        );

        const base64Image = await convertImageToBase64(manipulatedImage.uri);
        return base64Image;
      }
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      showToast('Failed to pick image. Please try again.', 'error');
      return null;
    }
  };

  return { pickImage };
}
