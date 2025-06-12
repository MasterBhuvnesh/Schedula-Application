/* eslint-disable */
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~/components';
import { color } from '~/constants/colors';
import { useTheme } from '~/hooks/useTheme';
import { ThemeType } from '~/types/theme.type';

const index = () => {
  const { theme, setTheme, loadTheme, colors } = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: '80%',
          padding: 20,
          backgroundColor: colors[600],
          borderRadius: 10,
          opacity: 0.8,
          justifyContent: 'center',
          shadowColor: colors[500],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 20,
          elevation: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Current theme: {theme}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, flexWrap: 'wrap' }}>
        {(['Amber', 'Emerald', 'Sky', 'Rose'] as ThemeType[]).map(
          themeOption => (
            <TouchableOpacity
              key={themeOption}
              onPress={() => setTheme(themeOption)}
              style={{
                width: 60,
                height: 60,
                backgroundColor: color[themeOption][500],
                borderRadius: 30,
                marginHorizontal: 10,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: theme === themeOption ? 3 : 0,
                borderColor: '#ffffff',
              }}
            >
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {themeOption}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default index;
