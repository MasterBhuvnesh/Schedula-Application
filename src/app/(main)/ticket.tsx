import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components';
import { BackgroundProvider } from '~/providers';
export default function TicketScreen() {
  return (
    <BackgroundProvider>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
        }}
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 200, height: 200 }}
        />
        <Text>TicketScreen</Text>
      </View>
    </BackgroundProvider>
  );
}
