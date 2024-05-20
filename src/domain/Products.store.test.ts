import "reflect-metadata";
import { ProductsStore } from "./Products.store";
import { ShopApi } from "@/dto/ShopApi";
import { Product } from "./products.types";
import { reaction } from "mobx";

function getMockProducts(): Product[] {
  return [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Product 1 description",
      image: "product1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      description: "Product 2 description",
      image: "product2.jpg",
    },
  ];
}

describe("ProductsStore", () => {
  let productsStore: ProductsStore;
  let mockShopApi: Pick<ShopApi, "getProducts">;

  beforeEach(() => {
    mockShopApi = {
      getProducts: jest.fn().mockResolvedValue(getMockProducts()),
    };
    productsStore = new ProductsStore(
      mockShopApi as Pick<ShopApi, "getProducts">,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initializes with empty products array", () => {
    expect(productsStore.products).toEqual([]);
  });

  it("should inject ShopApi dependency correctly", async () => {
    await productsStore.fetchProducts();
    expect(mockShopApi.getProducts).toHaveBeenCalledTimes(1);
  });

  it("should fetch products successfully and update the products array", async () => {
    expect(productsStore.products).toEqual([]);
    await productsStore.fetchProducts();
    expect(productsStore.products).toEqual(getMockProducts());
  });

  it("should handle errors during product fetching", async () => {
    const error = new Error("Mock Error");
    mockShopApi = {
      getProducts: jest.fn().mockRejectedValue(error),
    };
    productsStore = new ProductsStore(
      mockShopApi as Pick<ShopApi, "getProducts">,
    );

    await expect(productsStore.fetchProducts()).rejects.toThrow(error);
  });

  it("should ensure observable state changes when fetching products", async () => {
    expect(productsStore.products.length).toEqual(0);
    let length = 0;

    const dispose = reaction(
      () => productsStore.products.length,
      (products) => {
        length = products;
      },
    );

    // Call fetchProducts
    await productsStore.fetchProducts();
    expect(length).toBe(2);
    dispose();
  });
});
