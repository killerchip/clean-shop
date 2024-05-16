import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./themes";
import { PaperProvider } from "react-native-paper";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
