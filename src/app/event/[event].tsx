import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { EventDetailsCard, Text } from '~/components';
import { useToast } from '~/context';
import { Event } from '~/types/data/event.type';
export default function TicketScreen() {
  const { event } = useLocalSearchParams<{ event: string }>();
  const decodedEvent = JSON.parse(decodeURIComponent(event)) as Event;
  const { showToast } = useToast();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10,
          color: '#fff',
        }}
      >
        Here is the event details:
      </Text>
      <EventDetailsCard event={decodedEvent} showToast={showToast} />
    </View>
  );
}
