import { Text, View, ScrollView } from "react-native";

export default function CartScreen() {
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
      <Text>Panier</Text>
      </ScrollView>
    </View>
  );
}
