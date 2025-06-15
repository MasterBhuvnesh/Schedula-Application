/* eslint-disable */
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '~/context';
import { PermissionHandlers, PermissionState } from '~/types/permissions.type';

export const usePermissions = (): PermissionState & PermissionHandlers => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const [permissions, setPermissions] = useState<PermissionState>({
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
  }, [cameraPermission, showToast]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await checkPermissions();
    setRefreshing(false);
  }, [checkPermissions]);

  useEffect(() => {
    checkPermissions();
  }, [cameraPermission, checkPermissions]);

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

  return {
    ...permissions,
    handleRequestCameraPermission,
    requestMediaPermission,
    checkPermissions,
    onRefresh,
  };
};
