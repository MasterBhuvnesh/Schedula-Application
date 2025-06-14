import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '~/utils';

const Footer: React.FC = () => <View style={styles.footer} />;

const styles = StyleSheet.create({
  footer: {
    width: wp(100),
    height: hp(15) > 110 ? hp(15) : 110, // Ensure minimum height for smaller screens
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

export default Footer;
