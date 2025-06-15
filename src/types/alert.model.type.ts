export type CustomButton = {
  text: string;
  onPress: () => void;
  buttonstyle?: object;
  textStyle?: object;
};

export interface AlertModalProps {
  visible?: boolean;
  title?: string;
  description?: string;
  onCloseButton?: () => void;
  onCloseOutside?: () => void;
  customButtons?: CustomButton[];
  showCloseIcon?: boolean;
}
