import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { BackgroundProvider } from '~/providers';
import { wp } from '~/utils';

export default function TicketScreen() {
  return (
    <BackgroundProvider>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title} bold>
            Ticket
          </Text>
          <Text style={styles.description}>Ticket will be shown here</Text>
        </View>
      </View>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: wp(90),
    height: wp(70),
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
