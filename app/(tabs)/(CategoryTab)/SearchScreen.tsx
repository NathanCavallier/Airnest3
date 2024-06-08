import { Text, View, ScrollView } from "react-native";

export default function SearchScreen() {
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
      <Text> Search Screen.</Text>
      </ScrollView>
    </View>
  );
}
