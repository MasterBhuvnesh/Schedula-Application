import { Image } from 'expo-image';
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
        <Image
          source={require('@/assets/images/camera.png')}
          style={{ width: 100, height: 100 }}
        />
        <Image
          source={require('@/assets/images/notification.png')}
          style={{ width: 100, height: 100 }}
        />
        <Image
          source={require('@/assets/images/folder.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </BackgroundProvider>
  );
}
