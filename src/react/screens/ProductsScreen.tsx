import { Pressable, ScrollView, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { Text, Button } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { useNewDependency } from "../../config/ioc/useDependency.react";
import { ProductsScreenPresenter } from "../../presentation/ProductsScreen.presenter";

export const ProductsScreen = observer(function Root() {
  const router = useRouter();
  const presenter = useNewDependency(ProductsScreenPresenter);

  return (
    <>
      <Stack.Screen options={{ title: "Products" }} />
      <ScrollView style={styles.container}>
        <Text>Items in Cart: {presenter.itemsInCart}</Text>
        <Button mode="contained">My Button</Button>
        {presenter.productsList.map((product) => {
          return (
            <Pressable
              key={product.id}
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
