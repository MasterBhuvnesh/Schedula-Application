import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components';
import { BackgroundProvider } from '~/providers';
export default function HomeScreen() {
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
        <Text>HomeScreen</Text>
      </View>
    </BackgroundProvider>
  );
}
