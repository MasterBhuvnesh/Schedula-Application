/*
Status : Upcoming or Past
Registration : Open or Closed

Points :
- If Event status is "past" then its registration_status should be closed.
    - If registration_status is closed then show 'badge-check' filled Lucide Icon.
- If Event status is "upcoming" then its registration_status can be open or closed.
    - If registration_status is open then it should perform Registration process.
    - If registration_status is open then show 'chevron-right' Lucide Icon.
    - If registration_status is closed then it should not perform Registration process.
    - If registration_status is closed show 'lock' Lucide Icon [opticity - 0.75].
- If Event status is "upcoming" & registration_status is closed & price is 0 ( FREE) make the image border green (animate it if possible).
- It's Sorted by status , registration_status & start_time in ASCENDING order.
*/

import { AppIcon } from '~/components';
// import { theme } from '@/constants/theme';
import { Event } from '~/types/event.type';
// import { formatDate } from '@/utils/date';
import { Image } from 'expo-image';
import { CalendarClock, IndianRupee, MapPin } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  event: Event;
}
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const theme = {
  colors: {
    background: '#000',
    text: '#ffffff',
    border: '#ffffff',
    activetab: '#ffffff',
    tab: '#6b7280',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#4CAF50',
      800: '#065f46',
      900: '#064e3b',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#FF9800',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#F44336',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#2196F3',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
};

export const EventCard = ({ event }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={event.banner_image_url}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.row}>
          <AppIcon Icon={MapPin} color={theme.colors.text} size={18} />
          <Text style={styles.text}>{event.location}</Text>
        </View>

        {event.start_time && (
          <View style={styles.row}>
            <AppIcon Icon={CalendarClock} color={theme.colors.text} size={18} />
            <Text style={styles.text}>
              Start At : {formatDate(event.start_time)}
            </Text>
          </View>
        )}
        {event.end_time && (
          <View style={styles.row}>
            <AppIcon Icon={CalendarClock} color={theme.colors.text} size={18} />
            <Text style={styles.text}>
              End At : {formatDate(event.end_time)}
            </Text>
          </View>
        )}
        {event.price !== undefined && (
          <View style={styles.row}>
            <AppIcon Icon={IndianRupee} color={theme.colors.text} size={18} />
            <Text style={styles.text}>
              ₹{event.price} ({event.price_description})
            </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => {
          console.log(`View More : ${event.title}`); // Debug log
          //   router.push({ pathname: '/events/[id]', params: { id: event.id } });
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.gray[200]
              : theme.colors.text,
            borderRadius: 8,
            margin: 12,
            paddingVertical: 10,
            alignItems: 'center',
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.background,
            fontFamily: 'Bold',
            fontSize: 16,
          }}
        >
          View More
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  image: {
    width: 180,
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bold',
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    marginTop: 6,
    color: theme.colors.gray[600],
    fontFamily: 'Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: theme.colors.text,
  },
});
