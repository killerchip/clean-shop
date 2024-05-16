import { ProductListItem } from "../../../presentation/products.views";
import { Card } from "react-native-paper";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";

type Props = {
  product: ProductListItem;
  style?: StyleProp<ViewStyle>;
};

export const ProductListItemComponent = function ProductListItem({
  product,
  style = {},
}: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push({ pathname: `/product/${product.id}` });
  };

  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.container, style]}>
        <Card.Cover source={{ uri: product.image }} />
        <Card.Title title={product.title} titleVariant="titleLarge" />
        <Card.Content style={styles.content}>
          <Text>${product.price}</Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  title: {
    fontSize: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
