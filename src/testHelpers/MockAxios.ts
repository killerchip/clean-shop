import { ProductDto } from "@/dto/products.dto";
import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export function getMockProducts(): ProductDto[] {
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

export function createAxiosError(
  message: string,
  code?: string,
  response?: AxiosResponse,
  config?: InternalAxiosRequestConfig,
): AxiosError {
  return {
    isAxiosError: true,
    message,
    name: "AxiosError",
    config: config,
    code,
    response,
    toJSON: () => ({ message, name: "AxiosError" }),
  };
}

export function getExampleAxiosError() {
  return createAxiosError(
    "Example Axios error message",
    "ECONNABORTED",
    undefined,
    undefined,
  );
}

export type MockAxiosOptions = {
  get?:
    | { rejects: false; products?: ProductDto }
    | { rejects: true; error?: typeof Axios.AxiosError };
};

export function getMockAxios(MockAxiosOptions: MockAxiosOptions = {}) {
  const axios: typeof Axios = jest.createMockFromModule("axios");

  if (MockAxiosOptions.get?.rejects) {
    axios.get = jest
      .fn()
      .mockRejectedValue(MockAxiosOptions.get.error ?? getExampleAxiosError());
  } else {
    axios.get = jest.fn().mockResolvedValue({
      data: MockAxiosOptions.get?.products ?? getMockProducts(),
    });
  }

  return axios;
}
