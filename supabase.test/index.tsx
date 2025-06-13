import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from './component/quote.list.test';
import { useQuotesData } from './hook/useQuotes.test';

export default function App() {
  const { quotes, loading, error, refetch, loadMore, hasMore } =
    useQuotesData();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar style="dark" />
      <Image
        source={{
          uri: 'https://bqoschvttqomhxalmxoi.supabase.co/storage/v1/object/public/event-banners/a9e407c98e92c6ffc59e086495f19360.jpg',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <FlatList
        data={quotes}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={styles.header}>Quotes</Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 40 }}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && quotes.length > 0 ? (
            <Text>Loading more quotes...</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'bold',
  },
});
