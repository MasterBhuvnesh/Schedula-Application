import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackgroundProvider } from '~/providers';

export default function TicketScreen() {
  return (
    <BackgroundProvider>
      <View style={styles.container}></View>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
