import { Stack } from "expo-router";
import React from "react";



export default function SearchLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen 
      name="AllCategoriesScreen" 
      options={{
        headerShown: false,
      }}  
    />
    <Stack.Screen
      name="[categoryTitle]"
      options={{
        headerShown: false,
      }}
    />
    </Stack>
  );
}