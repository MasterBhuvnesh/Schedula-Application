import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { datalog } from '~/logger';
import { wp } from '~/utils';
interface ErrorProps {
  message?: string;
}

const CustomError: React.FC<ErrorProps> = ({ message }) => (
  datalog.error(message || 'An unexpected error occurred'),
  (
    <View style={styles.container}>
      <Text style={styles.text}>Error aa gaya 🥹.</Text>
      <Text style={styles.text}>Koi baat nahi, sab theek ho jayega.</Text>
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: wp(4.5),
    textAlign: 'center',
  },
});

export default CustomError;
