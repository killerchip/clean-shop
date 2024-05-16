// noinspection JSUnusedGlobalSymbols

import { Stack, useRouter } from "expo-router";
import { Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import { useNewDependency } from "../config/ioc/useDependency.react";
import { ProductsScreenPresenter } from "../presentation/ProductsScreen.presenter";

export default observer(function Root() {
  const router = useRouter();
  const presenter = useNewDependency(ProductsScreenPresenter);

  return (
    <>
      <Stack.Screen options={{ title: "Products" }} />
      <ScrollView style={styles.container}>
        <Text>Items in Cart: {presenter.itemsInCart}</Text>
        {presenter.productsList.map((product) => {
          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: { id: product.id },
                })
              }
            >
              <Text key={product.id}>{product.title}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
