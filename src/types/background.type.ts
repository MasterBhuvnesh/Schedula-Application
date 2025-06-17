export interface BackgroundState {
  background: BackgroundType;
  setBackground: (newBackground: BackgroundType) => Promise<void>;
  loadBackground: () => Promise<void>;
}

export type BackgroundProviderProps = {
  children: React.ReactNode;
};

export type BackgroundType = 'LinearGradient' | 'Video' | 'ImageLinear';
