import { Tabs } from 'expo-router';
import React from 'react';
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
      }}>
      <Tabs.Screen
        name="(HomeTab)"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="(SearchTab)"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="(CartTab)"
        options={{
          title: 'Panier',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="(AccountTab)"
        options={{
          title: 'Compte',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
}
