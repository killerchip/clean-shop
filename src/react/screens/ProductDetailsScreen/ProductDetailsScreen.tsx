import { observer } from "mobx-react-lite";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCreateProductDetailsScreenPresenter } from "../../../presentation/ProductDetailsScreen.presenter";
import { View } from "react-native";
import { Image } from "expo-image";
import { Text, Button } from "react-native-paper";
import { CartIcon } from "../../components/CartIcon";
import { PageScrollView } from "../../components/atoms/PageScrollView";
import { PriceTagMedium } from "../../components/atoms/PriceTags";
import styled from "styled-components/native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ProductDetailsScreen = observer(function ProductsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const presenter = useCreateProductDetailsScreenPresenter(Number(id));

  const onCartPress = () => presenter.addProductToCart();
  const { itemsInCart, product } = presenter;

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.title,
          headerBackTitleVisible: false,
          headerRight: () => <CartIcon itemsNumber={itemsInCart} />,
        }}
      />
      <PageScrollView>
        <ProductDetailsImage
          source={product?.image}
          transition={100}
          placeholder={{ blurhash }}
        />
        <TextContainer>
          <Title variant="headlineMedium">{product?.title}</Title>
          <ActionLine>
            <PriceTagMedium>${product?.price}</PriceTagMedium>
            <Button mode="contained" onPress={onCartPress} icon="cart">
              Add To Cart
            </Button>
          </ActionLine>
          <Description>{product?.description}</Description>
        </TextContainer>
      </PageScrollView>
    </>
  );
});

const ProductDetailsImage = styled(Image)`
  width: 100%;
  height: 250px;
`;

const Title = styled(Text)`
  text-align: center;
  margin-top: 6px;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ActionLine = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`;

const Description = styled(Text)`
  font-size: 16px;
  font-style: italic;
  padding-top: 10px;
`;

const TextContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
`;
