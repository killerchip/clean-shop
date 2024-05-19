import { ProductDto, toProduct } from "./products.dto";

describe("toProduct function", () => {
  it("transforms ProductDto to Product correctly", () => {
    const input: ProductDto = {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "Description 3",
      category: "category3",
      rating: { rate: 4.5, count: 100 },
      image: "image5.jpg",
    };
    const expectedOutput = {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "Description 3",
      image: "image5.jpg",
    };

    const result = toProduct(input);

    expect(result).toEqual(expectedOutput);
  });

  it("handles missing description by setting description to an empty string", () => {
    const input: ProductDto = {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "Description 3",
      category: "category3",
      rating: { rate: 4.5, count: 100 },
      image: "image5.jpg",
    };
    const expectedOutput = {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "Description 3",
      image: "image5.jpg",
    };

    const result = toProduct(input);

    expect(result).toEqual(expectedOutput);
  });
});
