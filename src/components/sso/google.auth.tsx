import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import React, { useCallback } from 'react';
import { GoogleButton } from '~/components';
import { useToast } from '~/context';
import { useWarmUpBrowser } from '~/hooks';
import { authlog } from '~/logger';

export default function GoogleAuth({
  buttonStyle,
  textStyle,
  iconColor,
}: {
  buttonStyle?: object;
  textStyle?: object;
  iconColor?: string;
}) {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const { showToast } = useToast();

  const onPress = useCallback(async () => {
    authlog.debug('Google SSO button pressed, starting flow...');

    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl: AuthSession.makeRedirectUri({
            scheme: 'schedula',
            path: '/',
          }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        showToast('Welcome to Schedula', 'success');
        authlog.success('User signed in successfully with Google SSO.');
      } else {
        if (signIn) {
          showToast('Please complete the additional sign-in steps.', 'warning');
          authlog.warn(
            'User needs to complete additional sign-in steps after Google SSO.'
          );
        } else if (signUp) {
          showToast('Please complete your account setup.', 'info');
          authlog.info(
            'User needs to complete sign-up steps after Google SSO.'
          );
        }
      }
    } catch (err) {
      authlog.error('Error during Google SSO flow :' + err);
      showToast('An error occurred during authentication. Please try again.');
    }
  }, [showToast, startSSOFlow]);

  return (
    <GoogleButton
      onPress={onPress}
      containerStyle={{
        ...buttonStyle,
      }}
      textStyle={textStyle}
      iconColor={iconColor}
    />
  );
}
