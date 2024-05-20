import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { Stack } from "expo-router";
import { useNewDependency } from "@/config/ioc/useDependency.react";
import { ProductsScreenPresenter } from "@/presentation/ProductsScreen.presenter";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ProductListItem } from "@/presentation/products.views";
import { ProductListItemComponent } from "./ProductListItemComponent";
import { CartIcon } from "../../components/CartIcon";
import { EmptyListComponent } from "./EmptyListComponent";
import styled from "styled-components/native";
import { useCallback, useEffect } from "react";
import { getStageMarker } from "@/config/env";

const renderItem: ListRenderItem<ProductListItem> = ({ item }) => {
  return (
    <ProductListItemComponent product={item} testID={`product-id-${item.id}`} />
  );
};

export const ProductsScreen = observer(function Root() {
  const presenter = useNewDependency(ProductsScreenPresenter);
  const { itemsInCart, isFirstFetch } = presenter;

  const onRefresh = () => presenter.loadProducts();
  const OptionalEmptyListComponent = useCallback(
    () => (isFirstFetch ? null : <EmptyListComponent />),
    [isFirstFetch],
  );

  useEffect(() => {
    presenter.loadProducts();
  }, [presenter]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Products" + getStageMarker(), // stage marker should not be presenter in PROD
          headerRight: () => <CartIcon itemsNumber={itemsInCart} />,
        }}
      />
      <Container>
        <FlashList
          testID="products-list"
          renderItem={renderItem}
          data={presenter.productsList.slice()}
          estimatedItemSize={282}
          refreshing={presenter.isFetching}
          onRefresh={onRefresh}
          ListEmptyComponent={OptionalEmptyListComponent}
        />
      </Container>
    </>
  );
});

const Container = styled(View)`
  flex: 1;
`;
