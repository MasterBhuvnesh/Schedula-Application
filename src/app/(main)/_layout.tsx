import { Tabs } from 'expo-router';
import { Home, Ticket, User } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { AppIcon } from '~/components';

function TabBarIcon(props: {
  Icon: React.ComponentType<any>;
  color: string;
  size: number;
}) {
  return <AppIcon Icon={props.Icon} color={props.color} size={props.size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: 'transparent',
          borderTopWidth: 1,
        },
        tabBarButton: ({ children, style, ...rest }: any) => (
          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }) => [style, { opacity: pressed ? 0.7 : 1 }]}
            {...rest}
          >
            {children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Home} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Ticket} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={User} color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
