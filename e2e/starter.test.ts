import { expect } from "detox";

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();

    await device.openURL({
      url: `com.killerchip.cleanshop://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8081`,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should run and load", async () => {
    await expect(element(by.text("Products - DEV"))).toBeVisible();
  });

  it("select a product goes to details", async () => {
    await expect(element(by.id("product-id-1-pressable-area"))).toBeVisible();
    await element(by.id("product-id-1-pressable-area")).tap();
    await element(by.text("Add To Cart")).tap();
    await element(by.text("Add To Cart")).tap();
    await expect(element(by.text("2"))).toBeVisible();
  });
  //   TODO: Add more tests
});
