import { View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

type Props = {
  testID?: string;
};

export function EmptyListComponent({ testID }: Props) {
  return (
    <Container testID={testID}>
      <Text variant="titleLarge">Nothing here :-(</Text>
      <Text variant="titleMedium">Pull to refresh</Text>
    </Container>
  );
}

const Container = styled(View)`
  /* TODO: bypass somehow this issue of FlashList where you can center the nothing here message */
  /* https://github.com/Shopify/flash-list/issues/848 */
  flex: 1px;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
