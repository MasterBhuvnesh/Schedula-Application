export interface PermissionState {
  camera: boolean;
  media: boolean;
}

export interface PermissionCardProps {
  title: string;
  description: string;
  Icon: any;
  granted: boolean;
  onPress: () => void;
}

export type PermissionType = 'camera' | 'media';

export interface PermissionStatus {
  granted: boolean;
  status?: string;
}

export interface PermissionHandlers {
  handleRequestCameraPermission: () => Promise<void>;
  requestMediaPermission: () => Promise<void>;
  checkPermissions: () => Promise<void>;
  onRefresh: () => Promise<void>;
}
