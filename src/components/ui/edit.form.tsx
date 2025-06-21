import { User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppIcon } from '~/components';

interface EditProfileFormSectionProps {
  firstName: string;
  lastName: string;
  isLoading: boolean;
  onFirstNameChange: (text: string) => void;
  onLastNameChange: (text: string) => void;
}

export function EditProfileFormSection({
  firstName,
  lastName,
  isLoading,
  onFirstNameChange,
  onLastNameChange,
}: EditProfileFormSectionProps) {
  return (
    <View style={styles.formSection}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AppIcon Icon={User} size={16} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.textInput}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={onFirstNameChange}
            editable={!isLoading}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AppIcon Icon={User} size={16} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.textInput}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={onLastNameChange}
            editable={!isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'regular',
    paddingVertical: 12,
    paddingLeft: 12,
  },
});
