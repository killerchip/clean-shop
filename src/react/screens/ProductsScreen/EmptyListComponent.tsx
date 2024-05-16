import { View } from "react-native";
import { Text } from "react-native-paper";

export function EmptyListComponent() {
  return (
    <View
      style={{
        flex: 1,
        // TODO: bypass somehow this issue of FlashList where you can center the nothing here message
        // https://github.com/Shopify/flash-list/issues/848
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="titleLarge">Nothing here :-(</Text>
      <Text variant="titleMedium">Pull to refresh</Text>
    </View>
  );
}
