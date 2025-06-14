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
    <TouchableOpacity
      onPress={confirmSignOut}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontFamily: 'regular',
          textAlign: 'center',
        }}
      >
        Sign out
      </Text>
    </TouchableOpacity>
  );
};
