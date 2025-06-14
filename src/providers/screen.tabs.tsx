import React from 'react';
import { Footer, Header } from '~/components';
import { BackgroundProvider } from '~/providers';
import { ScreenTabsProviderProps } from '~/types/tab.screen.type';

export const ScreenTabsProvider: React.FC<ScreenTabsProviderProps> = ({
  children,
}) => (
  <BackgroundProvider>
    <Header />
    {children}
    <Footer />
  </BackgroundProvider>
);
