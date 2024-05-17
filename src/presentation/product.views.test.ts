import { toProductListItem } from "./products.views";
import { Product } from "../domain/products.types";

describe("Product View Models", () => {
  const sampleProduct: Product = {
    id: 123,
    image: "https://example.com/product.jpg",
    title: "Sample Product",
    price: 99.99,
    description: "A sample product for testing",
  };

  describe("toProductListItem", () => {
    it("should correctly convert a Product to a ProductListItem", () => {
      const result = toProductListItem(sampleProduct);
      expect(result).toEqual({
        id: 123,
        image: "https://example.com/product.jpg",
        title: "Sample Product",
        price: 99.99,
      });
    });
  });
});
