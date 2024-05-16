// noinspection JSUnusedGlobalSymbols

import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useCreateProductDetailsScreenPresenter } from "../../presentation/ProductDetailsScreen.presenter";

export default observer(function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const presenter = useCreateProductDetailsScreenPresenter(Number(id));

  return (
    <>
      <Stack.Screen options={{ title: presenter.product?.title }} />
      <View style={styles.container}>
        <Text>{JSON.stringify(presenter.product, null, 2)}</Text>
      </View>
    </>
  );
});

// TODO: This should be a wrapper component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
