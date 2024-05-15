// noinspection JSUnusedGlobalSymbols

import "reflect-metadata";
import "../config/mobx";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack />
      <StatusBar style="auto" />
    </>
  );
}
