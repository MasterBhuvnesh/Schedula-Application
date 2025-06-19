import { Slot } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Slot
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: 0,
          flexGrow: 1,
        },
        tabBarStyle: {
          display: 'none',
        },
        animation: 'fade',
      }}
    />
  );
};

export default _layout;
