// noinspection JSUnusedGlobalSymbols

import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <>
      <Stack.Screen options={{ title: "Product Details" }} />
      <View style={styles.container}>
        <Text>Product with ID: {id}</Text>
      </View>
    </>
  );
}

// TODO: This should be a wrapper component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
