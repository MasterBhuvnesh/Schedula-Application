import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { BackgroundProvider } from '~/providers';

export default function TicketScreen() {
  const renderContent = () => {
    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            Ticket Screen
          </Text>
        </View>
      </>
    );
  };

  return <BackgroundProvider>{renderContent()}</BackgroundProvider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
