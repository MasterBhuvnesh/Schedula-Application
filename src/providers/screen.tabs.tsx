import React from 'react';
import { Footer, Header } from '~/components';
import { ScreenTabsProviderProps } from '~/types/tab.screen.type';
import { BackgroundProvider } from './background';

export const ScreenTabsProvider: React.FC<ScreenTabsProviderProps> = ({
  children,
}) => (
  <BackgroundProvider>
    <Header />
    {children}
    <Footer />
  </BackgroundProvider>
);
