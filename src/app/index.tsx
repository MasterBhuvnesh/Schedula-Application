import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AuthView } from '~/components';
export default function Home() {
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
