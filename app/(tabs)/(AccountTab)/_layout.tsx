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
    </Stack>
  );
}