// noinspection JSUnusedGlobalSymbols

import "reflect-metadata";
import "../config/mobx";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { AppThemeProvider } from "../config/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack />
      <StatusBar style="auto" />
    </AppThemeProvider>
  );
}
