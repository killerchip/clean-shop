// noinspection JSUnusedGlobalSymbols

import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Root() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Products" }} />
      <View style={styles.container}>
        <Text>Root page</Text>
        <Button
          title="Go"
          onPress={() =>
            router.push({ pathname: "/product/[id]", params: { id: "007" } })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
