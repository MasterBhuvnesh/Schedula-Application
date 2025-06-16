/*  
IMAGE BACKGROUND WITH BLUR AND LINEAR GRADIENT
THIS COMPONENT IS A PROVIDER THAT USES AN IMAGE AS A BACKGROUND WITH A BLUR EFFECT AND A LINEAR GRADIENT ON TOP.
CASES:
1. It applies a blurred image as the background.
2. It adds a dark overlay on top of the blurred image.
3. It applies a linear gradient on top of the dark overlay.
[This is useful for creating a visually appealing background for the app while maintaining readability of the content on top.]
*/

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { BackgroundProviderProps } from '~/types/background.type';

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.darkOverlay} />
      <Image
        source={{
          uri: 'https://bqoschvttqomhxalmxoi.supabase.co/storage/v1/object/public/event-banners/a9e407c98e92c6ffc59e086495f19360.jpg',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      />
      <LinearGradient
        colors={['#000', '#000', 'transparent', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.8, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
      />
      <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  blurContainer: {
    flex: 1,
  },
});
