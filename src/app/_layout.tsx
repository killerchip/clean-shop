// noinspection JSUnusedGlobalSymbols

import "reflect-metadata";
import "../config/mobx";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
