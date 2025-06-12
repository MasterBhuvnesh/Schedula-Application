import React from 'react';
import { View } from 'react-native';
import { SignOutButton, Text } from '~/components';
import { BackgroundProvider } from '~/providers';
export default function ProfileScreen() {
  return (
    <BackgroundProvider>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>ProfileScreen</Text>

        <SignOutButton />
      </View>
    </BackgroundProvider>
  );
}
