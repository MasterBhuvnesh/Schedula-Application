/*
NOT YET  SURE ABOUT THE BACKGROUND PROVIDER
OPTIONS :
1. Video Background 
2. Image Background with Blur
3. Linear Gradient with Blur
*/
/* USING -  IMAGE BACKGROUND WITH BLUR  */

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
