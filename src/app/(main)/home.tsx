import React, { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Error, EventCard, Loader, Text } from '~/components';
import { useToast } from '~/context';
import { useEventsData, useSponsoredEvent } from '~/hooks';
import { datalog } from '~/logger';
import { ScreenTabsProvider } from '~/providers';
import { hp, wp } from '~/utils';

export default function HomeScreen() {
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents,
    loadMore,
    hasMore,
  } = useEventsData();

  const {
    sponsoredEvent,
    loading: sponsoredLoading,
    error: sponsoredError,
    refetch: refetchSponsored,
  } = useSponsoredEvent();

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (eventsError || sponsoredError) {
      datalog.error('Error fetching data', eventsError || sponsoredError);
    }
  }, [eventsError, sponsoredError]);

  const handleRefresh = async () => {
    try {
      await Promise.all([refetchSponsored(), refetchEvents()]);
    } catch (error) {
      showToast('Failed to refresh data');
      datalog.error('Refresh error', String(error));
    }
  };

  const renderContent = () => {
    if (eventsLoading && events.length === 0) {
      return <Loader />;
    }

    if (eventsError && events.length === 0) {
      return <Error message={eventsError} />;
    }

    if (!eventsLoading && events.length === 0) {
      return (
        <View style={styles.center}>
          <Text>No events available.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={events}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        keyExtractor={item => item.id.toString()}
        // ListHeaderComponent={
        //   !sponsoredLoading &&
        //   sponsoredEvent &&
        //   sponsoredEvent.status === 'Upcoming' ? (
        //     <View>
        //       <SponsorCard event={sponsoredEvent} />
        //     </View>
        //   ) : null
        // }
        renderItem={({ item }) => (
          <EventCard
            event={item}
            viewableItems={viewableItems}
            showToast={showToast}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={eventsLoading || sponsoredLoading}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={() => {
          if (hasMore && !eventsLoading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    );
  };

  return (
    <ScreenTabsProvider>
      <View
        style={{
          width: wp(100),
          height: hp(70) > 540 ? hp(70) : 540,
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
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
