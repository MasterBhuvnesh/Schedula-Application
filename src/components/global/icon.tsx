import React from 'react';
import { AppIconProps } from '~/types/app.icon.type';

export const AppIcon: React.FC<AppIconProps> = ({
  Icon,
  size = 24,
  color = 'black',
  strokeWidth = 2,
  fill = 'transparent',
  style,
}) => {
  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      style={style}
      fill={fill}
    />
  );
};
