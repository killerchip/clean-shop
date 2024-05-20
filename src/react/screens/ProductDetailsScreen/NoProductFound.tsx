import styled from "styled-components/native";
import { View } from "react-native";
import { Text } from "react-native-paper";

export function NoProductFound() {
  return (
    <OopsContainer>
      <Text>Oops! No product found</Text>
    </OopsContainer>
  );
}

const OopsContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: baseline;
`;
