// app/index.tsx
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AuthView, Loader } from '~/components';
import { useInitialRouteRedirect } from '~/hooks';

export default function IndexScreen() {
  const { loading } = useInitialRouteRedirect();

  if (loading) {
    return <Loader />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignedIn>
        <Redirect href="/home" />
      </SignedIn>

      <SignedOut>
        <AuthView />
      </SignedOut>
    </View>
  );
}
