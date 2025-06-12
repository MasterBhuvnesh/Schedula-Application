import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer } from 'expo-video';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { color } from '~/constants/colors';
import { useTheme } from '~/hooks/useTheme';
import { BackgroundProviderProps } from '~/types/background.type';

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { colors: themecolors } = useTheme();

  const player = useVideoPlayer(
    require('@/assets/video/background.mp4'),
    player => {
      player.loop = true;
      player.muted = true;

      try {
        player.play();
        setIsReady(true);
      } catch (err) {
        setError(err as Error);
      }
    }
  );

  if (!isReady) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            themecolors[700],
            themecolors[800],
            themecolors[900],
            themecolors[950],
            '#000000',
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.8, y: 1.5 }}
          end={{ x: 0.5, y: 0 }}
        />
        {children}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            color.Zinc[800],
            color.Zinc[900],
            color.Zinc[950],
            '#000000',
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 1.7, y: 0.4 }}
          end={{ x: 1, y: 0 }}
        />
        {children}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
        showsTimecodes={false}
        contentFit="cover"
      /> */}
      {/* LINEAR GRADIENT - in case of video error */}
      <LinearGradient
        colors={[
          themecolors[700],
          themecolors[800],
          themecolors[900],
          themecolors[950],
          '#000000',
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.8, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
      />
      <View style={styles.darkOverlay} />
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  blurContainer: {
    flex: 1,
  },
});
