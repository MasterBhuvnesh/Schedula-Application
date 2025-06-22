import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components';
import { useTicketFiles, useUserData } from '~/hooks';
import { BackgroundProvider } from '~/providers';
import { TicketFile } from '~/types/data/ticket.type';
import { formatDateTime } from '~/utils';

export default function TicketScreen() {
  const { userData } = useUserData();
  const userId = userData?.id;
  const { files, loading, error, refreshFiles } = useTicketFiles(userId);
  const { width } = useWindowDimensions();

  const CARD_WIDTH = width * 0.85; // 85% of screen width
  const CARD_MARGIN = 16;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

  const renderQRCode = ({ item }: { item: TicketFile }) => (
    <View
      style={[
        styles.qrContainer,
        { width: CARD_WIDTH, marginHorizontal: CARD_MARGIN / 2 },
      ]}
    >
      <Text style={styles.eventTitle}>{item.eventTitle}</Text>

      <Image
        source={{ uri: item.imageUrl }}
        style={styles.qrImage}
        resizeMode="contain"
      />

      <View style={styles.eventInfoRow}>
        <Text style={styles.eventDetailLeft}>
          Location: {item.eventLocation}
        </Text>
        <Text style={styles.eventDetailRight}>
          {item.eventStartTime
            ? `${formatDateTime(item.eventStartTime).date} ${formatDateTime(item.eventStartTime).time}`
            : 'Date not available'}
        </Text>
      </View>

      <Text style={styles.registrationCode}>Code: {item.registrationCode}</Text>
      {/*  Download & Share - Button Implementation */}
      <Button title="Download" />
      <Button title="Share" />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tickets found</Text>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <Text style={styles.helpText}>
        {userId
          ? 'If you expected tickets, please pull to refresh or check back later.'
          : "Please make sure you're logged in."}
      </Text>
    </View>
  );

  if (loading && files.length === 0) {
    return (
      <BackgroundProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading your tickets...</Text>
        </SafeAreaView>
      </BackgroundProvider>
    );
  }

  return (
    <BackgroundProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={files}
          renderItem={renderQRCode}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            files.length === 0
              ? styles.emptyListContainer
              : styles.horizontalListContainer
          }
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={loading && files.length > 0}
              onRefresh={refreshFiles}
              colors={['#000']}
            />
          }
        />
      </SafeAreaView>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyListContainer: {
    flex: 1,
  },
  horizontalListContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
  },
  qrImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  eventInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventDetailLeft: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  eventDetailRight: {
    fontSize: 12,
    color: '#555',
    flex: 1,
    textAlign: 'right',
  },
  registrationCode: {
    fontSize: 14,
    fontFamily: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});
