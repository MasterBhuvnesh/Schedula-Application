import { AppWindow } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppIcon, Text } from '~/components';
import { color } from '~/constants/colors';
import { useBackground, useTheme } from '~/hooks';
import { ThemeType } from '~/types/theme.type';
import { wp } from '~/utils';

export default function BackgroundCard() {
  const { background, setBackground } = useBackground();
  const { theme, setTheme, loadTheme, colors } = useTheme();
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);
  const getButtonColor = (currentBg: string) =>
    background === currentBg ? '#4CAF50' : '#007AFF';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <AppIcon Icon={AppWindow} size={18} color={'#fff'} />
        <Text style={styles.cardTitle}>Background</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                background === 'LinearGradient' ? colors[600] : '#FF9800',
            },
          ]}
        >
          <Text style={styles.statusText}>
            {background === 'LinearGradient'
              ? 'Custom Theme : ' + theme
              : 'No Custom Theme'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>
        This provider allows you to set a background for your app.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={[
            styles.requestButton,
            {
              backgroundColor: getButtonColor('LinearGradient'),
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={() => setBackground('LinearGradient')}
          disabled={background === 'LinearGradient'}
        >
          <Text style={styles.requestButtonText}>Linear Gradient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.requestButton,
            {
              backgroundColor: getButtonColor('Video'),
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={() => setBackground('Video')}
          disabled={background === 'Video'}
        >
          <Text style={styles.requestButtonText}>Animated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.requestButton,
            {
              backgroundColor: getButtonColor('ImageLinear'),
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={() => setBackground('ImageLinear')}
          disabled={background === 'ImageLinear'}
        >
          <Text style={styles.requestButtonText}>Image with Blur</Text>
        </TouchableOpacity>
      </View>
      {background === 'LinearGradient' && (
        <>
          <Text style={styles.linearinfo}>
            You can customize your background linear gradient.
          </Text>
          <View
            style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'wrap' }}
          >
            {(['Amber', 'Emerald', 'Sky', 'Rose', 'Zinc'] as ThemeType[]).map(
              themeOption => (
                <TouchableOpacity
                  key={themeOption}
                  onPress={() => setTheme(themeOption)}
                  style={{
                    width: 50,
                    height: 40,
                    backgroundColor: color[themeOption]?.[500] ?? '#ccc',
                    borderRadius: 8,
                    marginHorizontal: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: theme === themeOption ? 2 : 0,
                    borderColor: '#ffffff',
                    gap: 8,
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: 'center' }}>
                    {themeOption}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
    marginHorizontal: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  cardDescription: {
    fontSize: 12,
    marginBottom: 10,
    opacity: 0.8,
  },
  requestButton: {
    width: wp(25),
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 8,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
    elevation: 20,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
  linearinfo: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
  },
});
