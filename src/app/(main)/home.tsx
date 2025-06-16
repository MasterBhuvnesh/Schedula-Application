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
import { useEventsData } from '~/hooks';
import { datalog } from '~/logger';
import { ScreenTabsProvider } from '~/providers';
import { hp, wp } from '~/utils';

export default function HomeScreen() {
  const { events, loading, error, refetch, loadMore, hasMore } =
    useEventsData();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { showToast } = useToast();
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
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        keyExtractor={item => item.id.toString()}
        // Will be used for the header component if needed
        // Uncomment the following lines if you want to add a header component
        // Will be working on it later to show sponsored events or announcements
        // ListHeaderComponent={
        //   <View
        //     style={{
        //       width: wp(90),
        //       height: wp(70),
        //       marginVertical: 8,
        //       borderWidth: 1,
        //       borderColor: '#fff',
        //       borderRadius: 12,
        //       backgroundColor: 'rgba(255,255,255, 0.5)',
        //       opacity: 0.8,
        //       shadowColor: '#000',
        //       shadowOffset: { width: 0, height: 0 },
        //       shadowOpacity: 0.2,
        //       shadowRadius: 10,
        //       elevation: 20,
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //       padding: 20,
        //     }}
        //   >
        //     <Text
        //       style={{
        //         fontSize: 20,
        //         marginBottom: 8,
        //       }}
        //       bold
        //     >
        //       Sponsor - Event
        //     </Text>
        //     <Text
        //       style={{
        //         fontSize: 14,
        //         opacity: 0.7,
        //         textAlign: 'center',
        //       }}
        //     >
        //       This is a sponsored event section. If you would like to sponsor an
        //       event, please contact us.
        //     </Text>
        //   </View>
        // }
        renderItem={({ item }) => (
          <EventCard
            event={item}
            viewableItems={viewableItems}
            showToast={showToast}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5} // Trigger when 50% from the end
        // ListFooterComponent={loading && events.length > 0 ? <Loader /> : null} // Uncomment if you want a footer loader
      />
    );
  };

  return (
    <ScreenTabsProvider>
      <View
        style={{
          width: wp(100),
          height: hp(70) > 540 ? hp(70) : 540, // Ensure minimum height for smaller screens
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
