import { observer } from "mobx-react-lite";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCreateProductDetailsScreenPresenter } from "../../presentation/ProductDetailsScreen.presenter";
import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text, Button, useTheme } from "react-native-paper";
import { CartIcon } from "../components/CartIcon";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ProductDetailsScreen = observer(function ProductsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const presenter = useCreateProductDetailsScreenPresenter(Number(id));

  const onCartPress = () => presenter.addProductToCart();
  const theme = useTheme();
  const { itemsInCart, product } = presenter;

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.title,
          headerRight: () => <CartIcon itemsNumber={itemsInCart} />,
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={product?.image}
          style={styles.image}
          transition={100}
          placeholder={{ blurhash }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} variant="headlineMedium">
            {product?.title}
          </Text>
          <View style={styles.actionLine}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              ${product?.price}
            </Text>
            <Button mode="contained" onPress={onCartPress} icon="cart">
              Add To Cart
            </Button>
          </View>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
    </>
  );
});

// TODO: This should be a wrapper component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { width: "100%", height: 250 },
  textContainer: {
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    marginTop: 6,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    paddingTop: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
  },
  actionLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
});
