import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { Stack } from "expo-router";
import { useNewDependency } from "../../../config/ioc/useDependency.react";
import { ProductsScreenPresenter } from "../../../presentation/ProductsScreen.presenter";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ProductListItem } from "../../../presentation/products.views";
import { ProductListItemComponent } from "./ProductListItemComponent";
import { CartIcon } from "../../components/CartIcon";
import { EmptyListComponent } from "./EmptyListComponent";

export const ProductsScreen = observer(function Root() {
  const presenter = useNewDependency(ProductsScreenPresenter);
  const { itemsInCart } = presenter;

  const renderItem: ListRenderItem<ProductListItem> = ({ item }) => {
    return <ProductListItemComponent product={item} />;
  };

  const onRefresh = () => presenter.loadProducts();

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
          data={presenter.productsList.slice()}
          estimatedItemSize={200}
          refreshing={presenter.isFetching}
          onRefresh={onRefresh}
          ListEmptyComponent={EmptyListComponent}
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
