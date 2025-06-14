import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Error, Loader, ProfileCard, SignOutButton } from '~/components';
import { useUserData } from '~/hooks';
import { BackgroundProvider } from '~/providers';

export default function ProfileScreen() {
  const { userData, error, refetch } = useUserData();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <BackgroundProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!userData && !error && <Loader />}
        {error && <Error message={error ?? undefined} />}
        {userData && <ProfileCard user={userData} />}
        <SignOutButton />
      </ScrollView>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
