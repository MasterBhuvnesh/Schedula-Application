import { TextStyle, ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'lock';
export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}
