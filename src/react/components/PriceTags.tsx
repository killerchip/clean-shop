import { MD3Theme, Text, withTheme } from "react-native-paper";
import styled from "styled-components/native";

export const PriceTag = withTheme(styled(Text)<{ theme: MD3Theme }>`
  color: ${(props) => props.theme.colors.primary};
`);

export const PriceTagMedium = withTheme(styled(PriceTag)<{ theme: MD3Theme }>`
  font-size: 25px;
`);
