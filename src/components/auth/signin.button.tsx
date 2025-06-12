import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from '~/components';

type GoogleButtonProps = {
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
};

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  onPress,
  containerStyle,
  textStyle,
  iconColor = '#ffffff',
}) => (
  <View style={containerStyle}>
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <FontAwesome5 name="google" size={18} color={iconColor} />
      <Text style={textStyle}>Google</Text>
    </TouchableOpacity>
  </View>
);
