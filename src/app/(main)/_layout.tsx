import { Tabs } from 'expo-router';
import React from 'react';
import { CustomNavBar } from '~/components';

export default function _layout() {
  return (
    <Tabs
      tabBar={props => <CustomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen name="ticket" options={{ title: 'Ticket' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
