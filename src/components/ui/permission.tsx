import { Camera, ImageIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { PermissionCard } from '~/components';
import { usePermissions } from '~/hooks';

interface PermissionsSectionProps {
  onRefresh?: () => Promise<void>;
}

export const PermissionsSection: React.FC<PermissionsSectionProps> = ({
  onRefresh,
}) => {
  const {
    camera,
    media,
    handleRequestCameraPermission,
    requestMediaPermission,
    checkPermissions,
  } = usePermissions();

  React.useEffect(() => {
    if (onRefresh) {
      // If external refresh is provided, we'll let the parent handle it
      // But we still need to check permissions on mount
      checkPermissions();
    }
  }, [onRefresh, checkPermissions]);

  return (
    <View>
      <PermissionCard
        title="Camera Access"
        description="Required to scan QR codes and take photos"
        Icon={Camera}
        granted={camera}
        onPress={handleRequestCameraPermission}
      />
      <PermissionCard
        title="Media Library"
        description="Needed to save QR codes and images to your gallery"
        Icon={ImageIcon}
        granted={media}
        onPress={requestMediaPermission}
      />
    </View>
  );
};
