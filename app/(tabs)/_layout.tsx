import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="(HomeTab)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { borderTopWidth: 2, borderTopColor: 'orange' } : {}}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? 'orange' : 'gray'} style={{ margin: 8, marginTop: 18 }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(SearchTab)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { borderTopWidth: 2, borderTopColor: 'orange' } : {}}>
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={focused ? 'orange' : 'gray'} style={{ margin: 8, marginTop: 18 }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(CartTab)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { borderTopWidth: 2, borderTopColor: 'orange' } : {}}>
              <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={focused ? 'orange' : 'gray'} style={{ margin: 8, marginTop: 18 }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(AccountTab)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { borderTopWidth: 2, borderTopColor: 'orange' } : {}}>
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? 'orange' : 'gray'} style={{ margin: 8, marginTop: 18 }} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
