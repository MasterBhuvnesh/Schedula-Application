import { StyleProp, ViewStyle } from 'react-native';

export interface AppIconProps {
  Icon: React.ComponentType<any>;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}
