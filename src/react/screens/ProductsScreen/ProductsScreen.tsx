import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { Stack } from "expo-router";
import { useNewDependency } from "../../../config/ioc/useDependency.react";
import { ProductsScreenPresenter } from "../../../presentation/ProductsScreen.presenter";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ProductListItem } from "../../../presentation/products.views";
import { ProductListItemComponent } from "./ProductListItemComponent";
import { CartIcon } from "../../components/CartIcon";

export const ProductsScreen = observer(function Root() {
  const presenter = useNewDependency(ProductsScreenPresenter);
  const { itemsInCart } = presenter;

  const renderItem: ListRenderItem<ProductListItem> = ({ item }) => {
    return <ProductListItemComponent product={item} />;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Products",
          headerRight: () => <CartIcon itemsNumber={itemsInCart} />,
        }}
      />
      <View style={styles.container}>
        <FlashList
          renderItem={renderItem}
          data={presenter.productsList}
          estimatedItemSize={40}
        />
      </View>
    </>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
