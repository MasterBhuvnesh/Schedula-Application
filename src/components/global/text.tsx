import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  bold?: boolean;
  opacity?: number;
  fontFamily?: string;
}

/**
 * Reusable text component with:
 * - Default white color
 * - Controllable opacity
 * - Automatic bold/regular font selection
 * - Optional font family override
 */

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  bold = false,
  opacity = 1,
  fontFamily,
  ...props
}) => {
  const fontToUse = fontFamily ? fontFamily : bold ? 'bold' : 'regular';

  return (
    <Text
      style={[
        {
          color: '#ffffff',
          opacity,
          fontFamily: fontToUse,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
