import { Image } from 'expo-image';
import { CalendarCheck, CalendarX, Lock } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text as Text_Button, View } from 'react-native';
import { Text } from '~/components';
import { useUserData } from '~/hooks';
import { registerForEvent } from '~/lib/event.register';
import { authlog, datalog } from '~/logger';
import { Event } from '~/types/data/event.type';
import { ToastContextType } from '~/types/toast.type';
import { formatDateTime, wp } from '~/utils';
interface EventDetailsCardProps {
  event: Event;
  showToast?: ToastContextType['showToast'];
}
export const EventDetailsCard = ({
  event,
  showToast,
}: EventDetailsCardProps) => {
  const { userData } = useUserData();
  console.log('Here is the user id from userData:', userData?.id);
  const startDateTime = formatDateTime(event.start_time);
  const endDateTime = formatDateTime(event.end_time);

  const renderRegistrationButton = () => {
    const handleRegistration = async () => {
      if (event.status === 'Upcoming' && event.registration_status === 'Open') {
        if (!userData) {
          authlog.warn('User data not loaded. Please try again.');
          return;
        }
        try {
          const {
            registrationId,
            code,
            newRegistration,
          }: {
            registrationId: string;
            code: string;
            newRegistration: boolean;
          } = await registerForEvent(event.id, userData.id);
          if (newRegistration) {
            showToast?.(
              `You have successfully registered for ${event.title}. Check your ticket in the Tickets section.`,
              'success'
            );
            datalog.data(
              'Ticket Generation',
              `Successfully registered for event ${event.title} with registration ID: ${registrationId}, code: ${code}`
            );
          } else {
            showToast?.(
              `Already registered for ${event.title}. View your ticket in the Tickets section.`,
              'info'
            );
            datalog.data(
              'Ticket Generation',
              `You have already registered for event ${event.title} with registration ID: ${registrationId}, code: ${code}`
            );
          }
        } catch (err) {
          console.error('Registration failed:', err);
        }
      }
    };

    let buttonText = '';
    let buttonIcon = null;
    let buttonStyle = {};
    let textStyle = {};

    if (event.status === 'Past') {
      buttonText = 'Event Ended';
      buttonIcon = <CalendarX size={20} color="white" />;
      buttonStyle = styles.endedButton;
      textStyle = styles.endedText;
    } else if (event.registration_status === 'Open') {
      buttonText = 'Register Now';
      buttonIcon = <CalendarCheck size={20} color="white" />;
      buttonStyle = styles.registerButton;
      textStyle = styles.registerText;
    } else {
      buttonText = 'Not Started Yet';
      buttonIcon = <Lock size={20} color="rgba(255,255,255,0.7)" />;
      buttonStyle = styles.pendingButton;
      textStyle = styles.pendingText;
    }

    return (
      <Pressable
        style={[styles.registrationButton, buttonStyle]}
        onPress={handleRegistration}
        disabled={
          event.status === 'Past' || event.registration_status !== 'Open'
        }
      >
        {buttonIcon}
        <Text_Button style={[styles.buttonText, textStyle]}>
          {buttonText}
        </Text_Button>
      </Pressable>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.priceContainer}>
        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'regular' }}>
          {event.location}
        </Text>
        <Text style={styles.price}>
          {event.price === 0 ? 'FREE' : `₹ ${event.price}`}
        </Text>
      </View>

      <Text style={styles.title} bold>
        {event.title}
      </Text>

      <Image
        source={{ uri: event.banner_image_url }}
        style={styles.image}
        contentFit="cover"
      />

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Starting date:</Text>
          <Text style={styles.detailText}>{startDateTime.date}</Text>
          <Text style={styles.timeLabel}>Time:</Text>
          <Text style={styles.detailText}>{startDateTime.time}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Ending date:</Text>
          <Text style={styles.detailText}>{endDateTime.date}</Text>
          <Text style={styles.timeLabel}>Time:</Text>
          <Text style={styles.detailText}>{endDateTime.time}</Text>
        </View>
      </View>
      {renderRegistrationButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(90),
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
    marginBottom: 10,
  },
  price: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'regular',
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
    color: '#fff',
  },
  image: {
    width: wp(80),
    height: wp(40),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  timeLabel: {
    fontSize: 10,
    color: '#ccc',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 8,
  },
  // Registration Button Styles
  registrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#4ade80', // Light Green
    opacity: 0.9,
  },
  pendingButton: {
    backgroundColor: '#f59e0b', // Orange
    opacity: 0.7,
  },
  endedButton: {
    backgroundColor: '#f43f5e', // Red
    opacity: 0.5,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'regular',
  },
  registerText: {
    color: 'white',
    fontFamily: 'regular',
  },
  pendingText: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'regular',
  },
  endedText: {
    color: 'white',
  },
});
