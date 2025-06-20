import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert, Text } from '~/components';
import { authlog } from '~/logger';
export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      authlog.error('Error during sign out: ' + err);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: '40%',

          borderWidth: 1,
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'regular',
            textAlign: 'center',
            backgroundColor: 'transparent',
          }}
        >
          Sign out
        </Text>
      </TouchableOpacity>
      <Alert
        visible={visible}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        onCloseButton={() => {
          setVisible(false);
          authlog.warn('Sign out cancelled');
        }}
        onCloseOutside={() => {
          setVisible(false);
          authlog.warn('Sign out cancelled');
        }}
        customButtons={[
          {
            text: 'Sign Out',
            onPress: handleSignOut,
            buttonstyle: { backgroundColor: '#1e1e22' },
          },
        ]}
      />
    </>
  );
};
