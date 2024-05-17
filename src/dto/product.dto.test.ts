import { ProductDto, toProduct } from "./products.dto";

describe("toProduct function", () => {
  it("transforms ProductDto to Product correctly", () => {
    const input: ProductDto = {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "Description 3",
      category: "category3",
      images: ["image5.jpg", "image6.jpg"],
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

  it("handles empty images array by setting image to undefined", () => {
    const input: ProductDto = {
      id: 4,
      title: "Product 4",
      price: 400,
      description: "Description 4",
      category: "category4",
      images: [],
    };
    const expectedOutput = {
      id: 4,
      title: "Product 4",
      price: 400,
      description: "Description 4",
      image: undefined,
    };

    const result = toProduct(input);

    expect(result).toEqual(expectedOutput);
  });

  it("handles missing description by setting description to an empty string", () => {
    const input: ProductDto = {
      id: 5,
      title: "Product 5",
      price: 500,
      description: "",
      category: "category5",
      images: ["image7.jpg"],
    };
    const expectedOutput = {
      id: 5,
      title: "Product 5",
      price: 500,
      description: "",
      image: "image7.jpg",
    };

    const result = toProduct(input);

    expect(result).toEqual(expectedOutput);
  });
});
