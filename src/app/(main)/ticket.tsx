import THEMING from '@/src/components/ui/theming';
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
        }}
      >
        <Text>TicketScreen</Text>
        <THEMING />
      </View>
    </BackgroundProvider>
  );
}
