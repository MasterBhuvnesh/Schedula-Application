import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '~/utils';

const Footer: React.FC = () => <View style={styles.footer} />;

const styles = StyleSheet.create({
  footer: {
    width: wp(100),
    height: hp(15),
    backgroundColor: 'transparent',
  },
});

export default Footer;
