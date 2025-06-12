import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '~/components';
import { useToast } from '~/context';
import { useTheme } from '~/hooks';
import { wp } from '~/utils';
export default function Home() {
  const { colors } = useTheme();
  const { showToast } = useToast();
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* The view below is use to represent the area used for toast msg and statusbar is from react native not from expo status bar */}
      {/* <View
        style={{
          width: wp(100),
          marginTop: StatusBar.currentHeight || 0,
          height: hp(12),
          backgroundColor: 'white',
        }}
      /> */}
      {/* INFO */}
      <Pressable
        style={{
          width: wp(80),
          height: wp(15),
          padding: wp(4),
          borderRadius: wp(4),
          margin: wp(4),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[600],
          opacity: 0.9,
          shadowColor: colors[400],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 100,
          elevation: 40,
        }}
        onPress={() => showToast('info - This is a toast message', 'info')}
      >
        <Text
          style={{
            textShadowOffset: { width: 0, height: 0 },
          }}
        >
          info
        </Text>
      </Pressable>
      {/* SUCCESS */}
      <Pressable
        style={{
          width: wp(80),
          height: wp(15),
          padding: wp(4),
          borderRadius: wp(4),
          margin: wp(4),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[600],
          opacity: 0.9,
          shadowColor: colors[400],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 100,
          elevation: 40,
        }}
        onPress={() => showToast('This is a toast message', 'success')}
      >
        <Text
          style={{
            textShadowOffset: { width: 0, height: 0 },
          }}
        >
          success
        </Text>
      </Pressable>
      {/* ERROR */}
      <Pressable
        style={{
          width: wp(80),
          height: wp(15),
          padding: wp(4),
          borderRadius: wp(4),
          margin: wp(4),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[600],
          opacity: 0.9,
          shadowColor: colors[400],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 100,
          elevation: 40,
        }}
        onPress={() => showToast('This is a toast message', 'error')}
      >
        <Text
          style={{
            textShadowOffset: { width: 0, height: 0 },
          }}
        >
          error
        </Text>
      </Pressable>
      {/* WARNING */}
      <Pressable
        style={{
          width: wp(80),
          height: wp(15),
          padding: wp(4),
          borderRadius: wp(4),
          margin: wp(4),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[600],
          opacity: 0.9,
          shadowColor: colors[400],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 100,
          elevation: 40,
        }}
        onPress={() => showToast('This is a toast message', 'warning')}
      >
        <Text
          style={{
            textShadowOffset: { width: 0, height: 0 },
          }}
        >
          warning
        </Text>
      </Pressable>
    </View>
  );
}
