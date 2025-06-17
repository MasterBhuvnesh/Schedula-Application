import { StyleSheet, View } from 'react-native';
import { useBackground } from '~/hooks';
import { BackgroundProviderProps } from '~/types/background.type';

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const { BackgroundProvider } = useBackground();
  return (
    <View style={styles.container}>
      <BackgroundProvider>{children}</BackgroundProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
