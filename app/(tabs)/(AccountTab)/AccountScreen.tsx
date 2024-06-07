import { Text, View, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export default function AccountScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <Text>Compte</Text>
      </ScrollView>
    </View>
  );
}
