import { observer } from "mobx-react-lite";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCreateProductDetailsScreenPresenter } from "../../presentation/ProductDetailsScreen.presenter";
import { Button, StyleSheet, Text, View } from "react-native";

export const ProductDetailsScreen = observer(function ProductsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const presenter = useCreateProductDetailsScreenPresenter(Number(id));

  const onCartPress = () => presenter.addProductToCart();

  return (
    <>
      <Stack.Screen options={{ title: presenter.product?.title }} />
      {presenter.displayAddToCartButton && (
        <Button
          title={`Add To Cart: ${presenter.itemsInCart}`}
          onPress={onCartPress}
        />
      )}
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
  },
});
