import { BackgroundProvider as ImageLinearBackground } from '~/background/background.image.linear';
import { BackgroundProvider as LinearGradientBackground } from '~/background/background.theme.linear';
import { BackgroundProvider as VideoBackground } from '~/background/background.video';
import { useBackgroundStore } from '~/stores/backgroundStore';
import { BackgroundType } from '~/types/background.type';

const backgroundProviders: Record<BackgroundType, React.ComponentType<any>> = {
  LinearGradient: LinearGradientBackground,
  Video: VideoBackground,
  ImageLinear: ImageLinearBackground,
};

export const useBackground = () => {
  const { background, setBackground } = useBackgroundStore();

  return {
    background,
    setBackground,
    BackgroundProvider: backgroundProviders[background],
  };
};
