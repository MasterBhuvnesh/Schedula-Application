import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import {
  BackgroundCard,
  Error,
  Loader,
  PermissionsSection,
  ProfileCard,
  SignOutButton,
} from '~/components';
import { usePermissions, useUserData } from '~/hooks';
import { BackgroundProvider } from '~/providers';

export default function ProfileScreen() {
  const { loading, userData, error, refetch } = useUserData();
  const { checkPermissions } = usePermissions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Refresh both user data and permissions
      await Promise.all([refetch(), checkPermissions()]);
    } catch (err) {
      console.error('Error during refresh:', err);
    } finally {
      setRefreshing(false);
    }
  }, [refetch, checkPermissions]);

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
            <PermissionsSection onRefresh={checkPermissions} />
            <BackgroundCard />
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    paddingBottom: 100,
  },
});
