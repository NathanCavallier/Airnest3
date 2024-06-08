import { Stack } from "expo-router";
import React from "react";


export default function HomeLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen 
      name="index" 
      options={{
        headerShown: false,
      }}  
    />
    <Stack.Screen
      name="ProductScreen"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CategoryScreen"
      options={{
        headerShown: false,
      }}
    />
    </Stack>
  );
}