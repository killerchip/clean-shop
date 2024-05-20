// noinspection JSUnusedGlobalSymbols

import "reflect-metadata";
import "../config/mobx";
import { StatusBar } from "expo-status-bar";
import { AppThemeProvider } from "@/config/theme/ThemeProvider";
import { RootErrorBoundary } from "@/react/components/RootErrorBoundary";
import { Stack } from "expo-router";

export const ErrorBoundary = RootErrorBoundary;

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack />
      <StatusBar style="auto" />
    </AppThemeProvider>
  );
}
