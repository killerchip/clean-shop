import { ProductListItem } from "@/presentation/products.views";
import { Card, MD3Theme, withTheme } from "react-native-paper";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { PriceTag } from "../../components/atoms/PriceTags";
import styled from "styled-components/native";

type Props = {
  product: ProductListItem;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const ProductListItemComponent = function ProductListItem({
  product,
  style = {},
  testID,
}: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push({ pathname: `/product/${product.id}` });
  };

  return (
    <Pressable onPress={onPress} testID={`${testID}-pressable-area`}>
      <ListItemCard style={style}>
        <Card.Cover source={{ uri: product.image }} />
        <Card.Title title={product.title} titleVariant="titleLarge" />
        <ListItemContent>
          <PriceTag>${product.price}</PriceTag>
        </ListItemContent>
      </ListItemCard>
    </Pressable>
  );
};

const ListItemCard = withTheme(styled(Card)<{ theme: MD3Theme }>`
  margin: 4px;
`);

const ListItemContent = withTheme(styled(Card.Content)<{ theme: MD3Theme }>`
  flex-direction: row;
  justify-content: flex-end;
`);
