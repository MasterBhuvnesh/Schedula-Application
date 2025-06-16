import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { supabase } from '~/lib/supabase';
import { BackgroundProvider } from '~/providers';
import { Event } from '~/types/data/event.type';
import { wp } from '~/utils';

export default function TicketScreen() {
  const [sponsoredEvent, setSponsoredEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSponsoredEvent = async () => {
    setLoading(true);
    try {
      console.log('Fetching sponsor_event...');
      const { data: sponsorEventData, error: sponsorEventError } =
        await supabase
          .from('sponsor_event')
          .select('event_id')
          .order('created_at', { ascending: false });

      console.log('sponsorEventData:', sponsorEventData);
      console.log('sponsorEventError:', sponsorEventError);

      if (sponsorEventError) throw sponsorEventError;
      if (!sponsorEventData) {
        setLoading(false);
        return;
      }

      // Then fetch the actual event data using the event_id
      const eventId =
        sponsorEventData.length > 0 ? sponsorEventData[0].event_id : null;
      console.log('eventId:', eventId);

      if (!eventId) {
        setLoading(false);
        setSponsoredEvent(null);
        return;
      }
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId);

      console.log('eventData:', eventData);
      console.log('eventError:', eventError);

      if (eventError) throw eventError;

      setSponsoredEvent(
        eventData && eventData.length > 0 ? eventData[0] : null
      );
      setError(null);
    } catch (err: any) {
      console.log('Error in fetchSponsoredEvent:', err);
      setError(err.message || 'Error fetching sponsored event');
      setSponsoredEvent(null);
    } finally {
      setLoading(false);
      console.log('fetchSponsoredEvent finished');
    }
  };

  useEffect(() => {
    console.log('TicketScreen mounted');
    fetchSponsoredEvent();
  }, []);

  if (loading) {
    console.log('Loading sponsored event...');
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </BackgroundProvider>
    );
  }

  if (error) {
    console.log('Error state:', error);
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </BackgroundProvider>
    );
  }

  if (!sponsoredEvent) {
    console.log('No sponsored event available');
    return (
      <BackgroundProvider>
        <View style={styles.container}>
          <Text>No sponsored event available</Text>
        </View>
      </BackgroundProvider>
    );
  }

  console.log('Sponsored event:', sponsoredEvent);

  return (
    <BackgroundProvider>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sponsoredLabel} bold>
            SPONSORED EVENT
          </Text>
          <Text style={styles.title} bold>
            {sponsoredEvent.title}
          </Text>
          <Image
            source={{
              uri:
                sponsoredEvent.banner_image_url ||
                'https://via.placeholder.com/150',
            }}
            style={{ width: wp(80), height: wp(40), borderRadius: 10 }}
            contentFit="cover"
          />
          <Text style={styles.description}>{sponsoredEvent.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              {new Date(sponsoredEvent.start_time).toLocaleDateString()}
            </Text>
            <Text style={styles.detailText}>{sponsoredEvent.location}</Text>
          </View>
        </View>
      </View>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: wp(90),
    minHeight: wp(70),
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginVertical: 10,
  },
  sponsoredLabel: {
    fontSize: 12,
    color: '#FFD700', // Gold color for sponsored label
    marginBottom: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailText: {
    fontSize: 12,
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
