import { Stack } from "expo-router";
import React from "react";


export default function AccountLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen 
      name="AccountScreen" 
      options={{
        headerShown: false, 
      }}  
    />
    <Stack.Screen
      name="about"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="contact"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="cgu"
      options={{
        headerShown: false,
      }}
    />
    </Stack>
  );
}