import React from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
    quote: string;
    theme: string;
  };
};

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);

    return (
      <Animated.View style={[styles.quoteContainer, rStyle]}>
        <Animated.Text style={styles.quote}>"{item.quote}"</Animated.Text>
        <Animated.View style={styles.themeContainer}>
          <Animated.Text style={styles.theme}>{item.theme}</Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  quoteContainer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  quote: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'regular',
  },
  themeContainer: {
    borderRadius: 20,
    backgroundColor: '#000',
    alignSelf: 'center',
    paddingHorizontal: 12,
    alignItems: 'center',
    padding: 8,
  },
  theme: {
    fontSize: 12,
    color: '#fff',
  },
});

export { ListItem };
