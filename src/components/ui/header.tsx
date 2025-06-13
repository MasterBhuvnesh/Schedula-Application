import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '~/utils';

const Header: React.FC = () => <View style={styles.header} />;

const styles = StyleSheet.create({
  header: {
    width: wp(100),
    height: hp(18),
    backgroundColor: 'transparent',
  },
});

export default Header;
