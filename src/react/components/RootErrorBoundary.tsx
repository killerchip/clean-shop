import { ErrorBoundaryProps } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import * as Updates from "expo-updates";

type Props = Pick<ErrorBoundaryProps, "error"> & {
  testID?: string;
};

export function RootErrorBoundary({ error, testID }: Props) {
  const reload = () => Updates.reloadAsync();

  return (
    <Container testID={testID}>
      <Text variant="displayMedium">Oops!</Text>
      <Text variant="titleMedium">Something went wrong:</Text>
      <Text>{error.message}</Text>
      <ReloadButton mode="contained" onPress={reload}>
        Restart the App
      </ReloadButton>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ReloadButton = styled(Button)`
  margin-top: 20px;
`;
