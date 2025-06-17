import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppIcon, Text } from '~/components';
import { PermissionCardProps } from '~/types/permissions.type';
import { wp } from '~/utils';

export const PermissionCard: React.FC<PermissionCardProps> = ({
  title,
  description,
  Icon,
  granted,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <AppIcon Icon={Icon} size={18} color={'#fff'} />
        <Text style={styles.cardTitle}>{title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: granted ? '#4CAF50' : '#FF6B6B' },
          ]}
        >
          <Text style={styles.statusText}>
            {granted ? 'Granted' : 'Denied'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      {!granted && (
        <TouchableOpacity style={styles.requestButton} onPress={onPress}>
          <Text style={styles.requestButtonText}>Request Permission</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
    marginHorizontal: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  cardDescription: {
    fontSize: 12,
    marginBottom: 10,
    opacity: 0.8,
  },
  requestButton: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
    elevation: 12,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
