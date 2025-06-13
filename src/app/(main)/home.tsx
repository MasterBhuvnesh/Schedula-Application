import React, { useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Error, EventCard, Loader, Text } from '~/components';
import { useEventsData } from '~/hooks';
import { datalog } from '~/logger';
import { ScreenTabsProvider } from '~/providers';
import { hp, wp } from '~/utils';
export default function HomeScreen() {
  const { events, loading, error, refetch, loadMore, hasMore } =
    useEventsData();

  useEffect(() => {
    if (error) {
      datalog.error('Error fetching events', error); // Log the error
    }
  }, [error]);

  const renderContent = () => {
    if (loading && events.length === 0) {
      return <Loader />;
    }

    if (error && events.length === 0) {
      return <Error message={error} />;
    }

    if (!loading && events.length === 0) {
      return (
        <View style={styles.center}>
          <Text>No events available.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5} // Trigger when 50% from the end
        ListFooterComponent={loading && events.length > 0 ? <Loader /> : null}
      />
    );
  };

  return (
    <ScreenTabsProvider>
      <View
        style={{
          width: wp(100),
          height: hp(67) > 520 ? hp(67) : 520, // Ensure minimum height for smaller screens
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        {renderContent()}
      </View>
    </ScreenTabsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
