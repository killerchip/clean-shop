import "reflect-metadata";
import { Container } from "inversify";
import { getTestContainer } from "@/testHelpers/testContainer";
import { ShopApi } from "./ShopApi";
import Axios from "axios";
import { Injectables } from "@/config/ioc/injectables";
import { ProductDto } from "./products.dto";
import { ErrorReportingService } from "@/services/ErrorReportingService";

function getMockProductData(): ProductDto[] {
  return [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description 1",
      image: "image1.jpg",
      rating: { rate: 5, count: 100 },
      category: "category1",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      description: "Description 2",
      image: "image3.jpg",
      rating: { rate: 5, count: 100 },
      category: "category2",
    },
  ];
}

describe("ShopApi", () => {
  let container: Container;
  let shopApi: ShopApi;
  let httpClient: typeof Axios;

  beforeEach(() => {
    // prepare container
    ({ container } = getTestContainer());
    httpClient = container.get(Injectables.HttpClient);
    // prepare mocks
    httpClient.get = jest
      .fn()
      .mockResolvedValue({ data: getMockProductData() });
    container.unbind(ErrorReportingService);
    container
      .bind<Pick<ErrorReportingService, "reportError">>(ErrorReportingService)
      .toConstantValue({
        reportError: jest.fn().mockResolvedValue(undefined),
      });

    // get the class under test
    shopApi = container.get(ShopApi);
  });

  it("should instantiate without errors", () => {
    expect(shopApi).toBeDefined();
  });

  it("should use the injected HttpClient for the request", async () => {
    await shopApi.getProducts();
    expect(httpClient.get).toHaveBeenCalled();
  });

  it("should call the correct URL when getProducts is called", async () => {
    // Test if getProducts calls `${SHOP_API}/products/`
    await shopApi.getProducts();
    expect(httpClient.get).toHaveBeenCalledWith(
      `http://localhost:3000/products/`,
    );
  });

  it("should correctly transform API response to Product[] with toProduct", async () => {
    // Test if the response from the API is correctly transformed to Product[] by toProduct
    const products = await shopApi.getProducts();
    expect(products).toStrictEqual([
      {
        id: 1,
        title: "Product 1",
        price: 100,
        description: "Description 1",
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        description: "Description 2",
        image: "image3.jpg",
      },
    ]);
  });

  it("should report error through ErrorReportingService when getProducts fails", async () => {
    const error = new Error("Test error");

    httpClient.get = jest.fn().mockRejectedValue(error);
    try {
      await shopApi.getProducts();
    } catch {}

    expect(
      container.get(ErrorReportingService).reportError,
    ).toHaveBeenCalledWith(error);
  });

  it("should throw the original error when getProducts fails", async () => {
    const error = new Error("Test error");

    httpClient.get = jest.fn().mockRejectedValue(error);
    await expect(shopApi.getProducts()).rejects.toThrow(error);
  });
});
