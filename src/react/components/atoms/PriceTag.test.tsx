import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "react-native-paper";
import "@testing-library/react-native/extend-expect";
import { PriceTag, PriceTagMedium } from "./PriceTags";

type ThemeType = {
  colors: {
    primary: string;
  };
};

const mockTheme: ThemeType = {
  colors: {
    primary: "rgba(103, 80, 164, 1)",
  },
};

describe("PriceTags Components with react-native-testing-library", () => {
  it("renders PriceTag with primary color from theme", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <PriceTag>Test Price</PriceTag>
      </ThemeProvider>,
    );

    const priceTag = screen.getByText("Test Price");
    expect(priceTag).toHaveStyle({ color: mockTheme.colors.primary });
  });

  it("renders PriceTagMedium with correct font size and primary color", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <PriceTagMedium>Test Price Medium</PriceTagMedium>
      </ThemeProvider>,
    );

    const priceTagMedium = screen.getByText("Test Price Medium");
    expect(priceTagMedium).toHaveStyle({
      fontSize: 25,
      color: mockTheme.colors.primary,
    });
  });

  it("PriceTag adjusts to theme changes", () => {
    const modifiedTheme = {
      ...mockTheme,
      colors: { ...mockTheme.colors, primary: "rgba(3, 218, 198, 1)" },
    };
    render(
      <ThemeProvider theme={mockTheme}>
        <PriceTag>Test Price</PriceTag>
      </ThemeProvider>,
    );

    render(
      <ThemeProvider theme={modifiedTheme}>
        <PriceTag>Test Price</PriceTag>
      </ThemeProvider>,
    );

    const priceTag = screen.getByText("Test Price");
    expect(priceTag).toHaveStyle({ color: modifiedTheme.colors.primary });
  });
});
