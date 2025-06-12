import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { authlog } from '~/logger';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      authlog.error('Error during sign out: ' + err);
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: handleSignOut },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={confirmSignOut}>
      <Text
        style={{
          color: '#fff',
          fontFamily: 'Regular',
          textAlign: 'center',
        }}
      >
        Sign out
      </Text>
    </TouchableOpacity>
  );
};
