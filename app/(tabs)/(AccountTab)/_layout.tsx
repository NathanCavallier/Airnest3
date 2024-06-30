import { Stack } from "expo-router";
import React from "react";


export default function AccountLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cgu"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Legal"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}