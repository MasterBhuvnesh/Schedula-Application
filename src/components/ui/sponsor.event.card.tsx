import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { Event } from '~/types/data/event.type';
import { wp } from '~/utils';

interface SponsorCardProps {
  event: Event;
}

export const SponsorCard = ({ event }: SponsorCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.priceContainer}>
        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'regular' }}>
          {event.registration_status === 'Open'
            ? 'Registration Now'
            : event.registration_status === 'Closed'
              ? 'Upcoming'
              : ''}
        </Text>
        <Text style={styles.price}>
          {event.price ? `₹ ${event.price}` : 'FREE'}
        </Text>
      </View>
      <Text style={styles.title} bold>
        {event.title}
      </Text>
      <Pressable
        onPress={() => {
          const encodedEvent = encodeURIComponent(JSON.stringify(event));
          router.push({
            pathname: '/event/[event]',
            params: { event: encodedEvent },
          });
          router.setParams({ animation: 'fade' });
        }}
      >
        <Image
          source={{ uri: event.banner_image_url }}
          style={styles.image}
          contentFit="cover"
        />
      </Pressable>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          {new Date(event.start_time).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>{event.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    maxHeight: wp(110),
    height: wp(110),
    marginVertical: 8,
    borderCurve: 'continuous',
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    marginHorizontal: 4,
    fontSize: 12,
    color: '#fff',
    fontFamily: 'regular',
    marginTop: 2,
    width: wp(18),
    borderRadius: 4,
    padding: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: wp(80),
    height: wp(40),
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailText: {
    fontSize: 12,
  },
});
