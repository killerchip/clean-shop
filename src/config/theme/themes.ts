import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { DefaultTheme } from "@react-navigation/native";

// see : https://callstack.github.io/react-native-paper/docs/guides/theming
const customLightColors = {
  colors: {
    primary: "rgb(109, 35, 249)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(232, 221, 255)",
    onPrimaryContainer: "rgb(34, 0, 93)",
    secondary: "rgb(0, 107, 96)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(79, 251, 229)",
    onSecondaryContainer: "rgb(0, 32, 28)",
    tertiary: "rgb(121, 89, 0)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 223, 160)",
    onTertiaryContainer: "rgb(38, 26, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(28, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(28, 27, 30)",
    surfaceVariant: "rgb(231, 224, 236)",
    onSurfaceVariant: "rgb(73, 69, 78)",
    outline: "rgb(122, 117, 127)",
    outlineVariant: "rgb(202, 196, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(49, 48, 51)",
    inverseOnSurface: "rgb(244, 239, 244)",
    inversePrimary: "rgb(207, 189, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 240, 255)",
      level2: "rgb(243, 234, 255)",
      level3: "rgb(239, 227, 254)",
      level4: "rgb(238, 225, 254)",
      level5: "rgb(235, 221, 254)",
    },
    surfaceDisabled: "rgba(28, 27, 30, 0.12)",
    onSurfaceDisabled: "rgba(28, 27, 30, 0.38)",
    backdrop: "rgba(50, 47, 56, 0.4)",
  },
};
const customDarkColors = {
  colors: {
    primary: "rgb(207, 189, 255)",
    onPrimary: "rgb(58, 0, 147)",
    primaryContainer: "rgb(83, 0, 205)",
    onPrimaryContainer: "rgb(232, 221, 255)",
    secondary: "rgb(23, 222, 201)",
    onSecondary: "rgb(0, 55, 49)",
    secondaryContainer: "rgb(0, 80, 72)",
    onSecondaryContainer: "rgb(79, 251, 229)",
    tertiary: "rgb(248, 189, 42)",
    onTertiary: "rgb(64, 45, 0)",
    tertiaryContainer: "rgb(92, 67, 0)",
    onTertiaryContainer: "rgb(255, 223, 160)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(28, 27, 30)",
    onBackground: "rgb(230, 225, 230)",
    surface: "rgb(28, 27, 30)",
    onSurface: "rgb(230, 225, 230)",
    surfaceVariant: "rgb(73, 69, 78)",
    onSurfaceVariant: "rgb(202, 196, 207)",
    outline: "rgb(148, 143, 153)",
    outlineVariant: "rgb(73, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(230, 225, 230)",
    inverseOnSurface: "rgb(49, 48, 51)",
    inversePrimary: "rgb(109, 35, 249)",
    elevation: {
      level0: "transparent",
      level1: "rgb(37, 35, 41)",
      level2: "rgb(42, 40, 48)",
      level3: "rgb(48, 45, 55)",
      level4: "rgb(50, 46, 57)",
      level5: "rgb(53, 50, 62)",
    },
    surfaceDisabled: "rgba(230, 225, 230, 0.12)",

    onSurfaceDisabled: "rgba(230, 225, 230, 0.38)",
    backdrop: "rgba(50, 47, 56, 0.4)",
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme,
    ...customLightColors.colors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme,
    ...customDarkColors.colors,
  },
};

export const { LightTheme: navLightTheme, DarkTheme: navDarkTheme } =
  adaptNavigationTheme({
    reactNavigationDark: DefaultTheme,
    reactNavigationLight: DefaultTheme,
    materialLight: lightTheme,
    materialDark: darkTheme,
  });
