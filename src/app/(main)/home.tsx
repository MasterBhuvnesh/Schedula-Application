import { useToast } from '@/src/context';
import { useTheme } from '@/src/hooks';
import { wp } from '@/src/utils';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '~/components';
import { BackgroundProvider } from '~/providers';
export default function HomeScreen() {
  const { colors } = useTheme();
  const { showToast } = useToast();
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

        <Pressable
          style={{
            opacity: 0.8,
            backgroundColor: colors[500],
            borderRadius: 5,
            width: wp(60),
            paddingVertical: 12,
            paddingHorizontal: 20,
            shadowColor: colors[600],
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            alignSelf: 'center',
          }}
          onPress={() => {
            // Navigate to the ticket screen
            // This is just a placeholder, replace with actual navigation logic
            showToast('Success', 'success');
          }}
        >
          <Text
            style={{
              fontFamily: 'Regular',
              textAlign: 'center',
            }}
          >
            Go to Ticket
          </Text>
        </Pressable>
      </View>
    </BackgroundProvider>
  );
}
