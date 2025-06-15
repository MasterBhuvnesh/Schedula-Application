import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Error, Loader, ProfileCard, SignOutButton } from '~/components';
import { useUserData } from '~/hooks';
import { BackgroundProvider } from '~/providers';

export default function ProfileScreen() {
  const { loading, userData, error, refetch } = useUserData();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderContent = () => {
    if (loading && !userData) {
      return <Loader />;
    }

    if (error && !userData) {
      return <Error message={error} />;
    }

    if (!loading && !userData) {
      return (
        <Error message="No user data available. Please try again later." />
      );
    }

    return (
      <>
        {userData && (
          <>
            <ProfileCard user={userData} />
            <SignOutButton />
          </>
        )}
      </>
    );
  };

  return (
    <BackgroundProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
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
