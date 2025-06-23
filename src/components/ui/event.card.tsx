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

import { Image } from 'expo-image';
import { router } from 'expo-router';
import { CircleCheck, Info, Lock } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AppIcon } from '~/components';
import { datalog } from '~/logger';
import { Event } from '~/types/data/event.type';
import { ToastContextType } from '~/types/toast.type';
import { FormatDate, wp } from '~/utils';

interface Props {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  event: Event;
  showToast?: ToastContextType['showToast'];
}

const EventCard: React.FC<Props> = React.memo(
  ({ event, viewableItems, showToast }) => {
    datalog.data('Event Data ', event); // Log the event data for debugging
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === event.id)
      );

      return {
        opacity: withTiming(isVisible ? 0.8 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);
    let IconComponent;
    let iconColor = '#000';
    let iconfill = 'transparent';

    if (event.status === 'Past' && event.registration_status === 'Closed') {
      IconComponent = CircleCheck;
      iconColor = 'white';
    } else if (
      event.status === 'Upcoming' &&
      event.registration_status === 'Closed'
    ) {
      IconComponent = Lock;
      iconColor = 'rgba(255, 255, 255, 0.3)';
    } else if (
      event.status === 'Upcoming' &&
      event.registration_status === 'Open'
    ) {
      IconComponent = Info;
      iconColor = 'white';
    }

    return (
      <Animated.View style={[styles.eventContainer, rStyle]}>
        <Animated.View style={styles.dateContainer}>
          <Animated.Text style={styles.month}>
            {FormatDate(event.start_time).month}
          </Animated.Text>
          <Animated.Text style={styles.day}>
            {FormatDate(event.start_time).day}
          </Animated.Text>
        </Animated.View>

        <Animated.View style={styles.dataContainer}>
          <Pressable
            onPress={() => {
              const encodedEvent = encodeURIComponent(JSON.stringify(event));
              router.push({
                pathname: '/event/[event]',
                params: { event: encodedEvent },
              });
              router.setParams({ animation: 'fade' });
              showToast?.(
                `More information about ${event.title}.`,
                'info',
                3000
              );
            }}
          >
            <Image
              source={event.banner_image_url}
              style={styles.image}
              contentFit="cover"
            />
          </Pressable>
          <Animated.View style={styles.titleContainer}>
            <Animated.Text numberOfLines={2} style={styles.title}>
              {event.title}
            </Animated.Text>
            <Animated.Text numberOfLines={1} style={styles.location}>
              {event.location}
            </Animated.Text>
            <Animated.Text numberOfLines={1} style={styles.price}>
              {event.price === 0 ? 'FREE' : `₹ ${event.price}`}
            </Animated.Text>
          </Animated.View>

          <Pressable
            onPress={() => {
              if (event.registration_status === 'Open') {
                showToast!(
                  `Registration for ${event.title} is open.`,
                  'success'
                );
              } else if (
                event.registration_status === 'Closed' &&
                event.status === 'Upcoming'
              ) {
                showToast!(
                  `Registration for ${event.title} has not opened yet.`,
                  'lock'
                );
              } else {
                showToast!(
                  `Registration is closed for ${event.title}.`,
                  'info'
                );
              }
            }}
          >
            <Animated.View style={styles.iconContainer}>
              {IconComponent && (
                <AppIcon
                  Icon={IconComponent}
                  color={iconColor}
                  size={20}
                  fill={iconfill}
                />
              )}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  eventContainer: {
    width: wp(90),
    height: 120,
    borderCurve: 'continuous',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    // opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
    flexDirection: 'row',
    display: 'flex',
  },
  dateContainer: {
    width: wp(14),
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'regular',
  },
  day: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'bold',
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  image: {
    width: wp(18),
    height: wp(18),
    borderRadius: 8,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'regular',
  },
  location: {
    fontSize: 12,
    color: '#ccc',
    fontFamily: 'regular',
    marginTop: 2,
  },
  price: {
    marginHorizontal: 4,
    fontSize: 12,
    color: '#fff',
    fontFamily: 'regular',
    marginTop: 2,
    width: wp(18),
    alignSelf: 'flex-end',
    borderRadius: 4,
    padding: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    padding: 12,
  },
});

EventCard.displayName = 'EventCard';
export { EventCard };
