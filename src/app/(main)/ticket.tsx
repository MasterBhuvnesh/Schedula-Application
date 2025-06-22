import { TicketFile } from '@/src/hooks/useTicketsFiles';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { useUserData } from '~/hooks';
import { useTicketFiles } from '~/hooks/useTicketsFiles';
import { BackgroundProvider } from '~/providers';

export default function TicketScreen() {
  const { userData } = useUserData();
  const userId = userData?.id;
  const { files, loading, error, refreshFiles } = useTicketFiles(userId);
  console.log('TicketScreen files:', files[0]);
  const renderQRCode = ({ item }: { item: TicketFile }) => (
    <View style={styles.qrContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.qrImage}
        resizeMode="contain"
      />
      <Text style={styles.eventTitle}>{item.eventTitle}</Text>
      <Text style={styles.eventDetail}>Location: {item.eventLocation}</Text>
      <Text style={styles.eventDetail}>
        Starts: {new Date(item.eventStartTime).toLocaleString()}
      </Text>
      <Text style={styles.registrationCode}>Code: {item.registrationCode}</Text>
    </View>
  );

  if (loading) {
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <Text>Loading tickets...</Text>
        </View>
      </BackgroundProvider>
    );
  }

  if (error) {
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      </BackgroundProvider>
    );
  }

  if (files.length === 0) {
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <Text>No tickets found</Text>
        </View>
      </BackgroundProvider>
    );
  }

  return (
    <BackgroundProvider>
      <FlatList
        data={files}
        renderItem={renderQRCode}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={1} // Changed to 1 column for better readability of all details
        onRefresh={refreshFiles}
        refreshing={loading}
      />
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 10,
  },
  qrContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetail: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  registrationCode: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2c3e50',
  },
  error: {
    color: 'red',
  },
});
