import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Edit2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppIcon, Text } from '~/components';
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
      <View>
        <Image source={{ uri: user.image_url }} style={styles.profileImage} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>
          {user.full_name || user.username || 'User Profile'}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {user.role === 'Admin' && (
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user.role}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.EditBadge}
            onPress={() => router.push('/edit')}
          >
            <AppIcon Icon={Edit2} size={12} color="#fff" />
            <Text style={styles.EditText}>Edit</Text>
          </TouchableOpacity>
        </View>
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
    borderCurve: 'continuous',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 0,
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
    backgroundColor: 'transparent',
  },
  fullName: {
    fontSize: 18,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  email: {
    fontSize: 12,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  roleBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
  },
  EditBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  EditText: {
    color: '#fff',
    fontSize: 12,
  },
});
