import { View } from "react-native";
import { Badge, Icon } from "react-native-paper";

type Props = {
  itemsNumber?: number;
  size?: number;
  testID?: string;
};
export function CartIcon({ itemsNumber, size = 36, testID }: Props) {
  return (
    <View style={{ width: size, height: size }} testID={testID}>
      <Icon size={size} source="cart" />

      {itemsNumber !== undefined && itemsNumber > 0 && (
        <Badge style={{ position: "absolute" }} testID={`${testID}-cart-badge`}>
          {itemsNumber}
        </Badge>
      )}
    </View>
  );
}
