import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, navDarkTheme, navLightTheme } from "./themes";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const navTheme = colorScheme === "dark" ? navDarkTheme : navLightTheme;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={navTheme}>{children}</ThemeProvider>
    </PaperProvider>
  );
}
