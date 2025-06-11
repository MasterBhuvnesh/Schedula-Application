import { ReactNode } from 'react';

export type BackgroundProviderProps = {
  children: ReactNode;
  fallback?: ReactNode;
};
