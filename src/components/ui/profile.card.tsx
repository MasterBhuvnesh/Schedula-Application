import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '~/components';
import { datalog } from '~/logger';
import { User } from '~/types/data/user.type';
import { wp } from '~/utils';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  datalog.data('ProfileCard rendered', user); // Log the profile data for debugging
  return (
    <View style={styles.profileCard}>
      <Image source={{ uri: user.image_url }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>
          {user.full_name || user.username || 'User Profile'}
        </Text>
        <Text style={styles.email} opacity={0.7}>
          {user.email}
        </Text>
        {user.role === 'Admin' && (
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    width: wp(90),
    height: wp(30),
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
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
  },
});
