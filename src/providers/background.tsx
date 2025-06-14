/*
NOT SURE ABOUT THE BACKGROUND PROVIDER
OPTIONS :
1. Video Background 
2. Image Background with Blur
3. Linear Gradient with Blur
*/
/*  IMAGE BACKGROUND WITH BLUR  */

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '~/hooks';
import { BackgroundProviderProps } from '~/types/background.type';

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  // const [isReady, setIsReady] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  const { colors: themecolors } = useTheme();

  // const player = useVideoPlayer(
  //   require('@/assets/video/background.mp4'),
  //   player => {
  //     player.loop = true;
  //     player.muted = true;

  //     try {
  //       player.play();
  //       setIsReady(true);
  //     } catch (err) {
  //       setError(err as Error);
  //     }
  //   }
  // );

  // if (!isReady) {
  //   return (
  //     <View style={styles.container}>
  //       <LinearGradient
  //         colors={[
  //           themecolors[700],
  //           themecolors[800],
  //           themecolors[900],
  //           themecolors[950],
  //           '#000000',
  //         ]}
  //         style={StyleSheet.absoluteFill}
  //         start={{ x: 0.8, y: 1.5 }}
  //         end={{ x: 0.5, y: 0 }}
  //       />
  //       {children}
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <LinearGradient
  //         colors={[
  //           color.Zinc[800],
  //           color.Zinc[900],
  //           color.Zinc[950],
  //           '#000000',
  //         ]}
  //         style={StyleSheet.absoluteFill}
  //         start={{ x: 1.7, y: 0.4 }}
  //         end={{ x: 1, y: 0 }}
  //       />
  //       {children}
  //     </View>
  //   );
  // }

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
      {/*  Look Cooled - Short Trick */}
      <Image
        source={{
          uri: 'https://bqoschvttqomhxalmxoi.supabase.co/storage/v1/object/public/event-banners/a9e407c98e92c6ffc59e086495f19360.jpg',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <LinearGradient
        colors={['#000000', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.8, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
      />
      <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
        {/* <BlurView intensity={90} tint="dark" style={styles.blurContainer}> */}
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
