import { View } from "react-native";
import { Badge, Icon } from "react-native-paper";

type Props = {
  itemsNumber?: number;
  size?: number;
};
export function CartIcon({ itemsNumber, size = 36 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Icon size={size} source="cart" />

      {itemsNumber !== undefined && itemsNumber > 0 && (
        <Badge style={{ position: "absolute" }}>{itemsNumber}</Badge>
      )}
    </View>
  );
}
