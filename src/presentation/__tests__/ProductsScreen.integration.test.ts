import "reflect-metadata";
import { Container } from "inversify";
import { getTestContainer } from "@/testHelpers/testContainer";
import { Alert } from "react-native";
import { ProductsScreenPresenter } from "../ProductsScreen.presenter";
import { reaction } from "mobx";
import {
  getExampleAxiosError,
  getMockAxios,
  getMockProducts,
} from "@/testHelpers/MockAxios";
import { CartStore } from "@/domain/Cart.store";

describe("ProductsScreen", () => {
  let container: Container;
  let alertSpy: jest.SpyInstance;
  let presenter: ProductsScreenPresenter;

  beforeEach(() => {
    ({ container } = getTestContainer());
    alertSpy = jest.spyOn(Alert, "alert").mockImplementation();
    jest.spyOn(console, "log").mockImplementation();
    presenter = container.get(ProductsScreenPresenter);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize correctly and immediately", async () => {
    expect(presenter.isFetching).toBe(false);
    expect(presenter.isFirstFetch).toBe(true);
    expect(presenter.productsList).toEqual([]);
    expect(presenter.itemsInCart).toBe(0);
  });

  it("should load products", async () => {
    const isFetchingTracker: boolean[] = [];
    const isFirstFetchTracker: boolean[] = [];

    const dispose = reaction(
      () => presenter.isFetching,
      (isFetching) => {
        isFetchingTracker.push(isFetching);
      },
    );

    const dispose2 = reaction(
      () => presenter.isFirstFetch,
      (isFirstFetch) => {
        isFirstFetchTracker.push(isFirstFetch);
      },
    );

    await presenter.loadProducts();
    expect(isFetchingTracker).toEqual([true, false]);
    expect(isFirstFetchTracker).toEqual([false]);
    expect(presenter.productsList).toEqual([
      {
        id: 1,
        title: "Product 1",
        price: 100,
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        image: "image3.jpg",
      },
    ]);

    expect(presenter.itemsInCart).toBe(0);
    dispose();
    dispose2();
  });

  it("on fetch error shows alert", async () => {
    const axios = getMockAxios({ get: { rejects: true } });
    ({ container } = getTestContainer({ MockAxios: axios }));
    alertSpy = jest.spyOn(Alert, "alert").mockImplementation();
    presenter = container.get(ProductsScreenPresenter);

    await presenter.loadProducts();
    expect(alertSpy).toHaveBeenCalledWith("Error", "Failed to fetch products");
  });

  it("should not alter the products list when fetching error", async () => {
    const axios = getMockAxios();
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ data: getMockProducts() })
      .mockRejectedValue(getExampleAxiosError());

    const container = getTestContainer({ MockAxios: axios }).container;
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation();
    const presenter = container.get(ProductsScreenPresenter);

    await presenter.loadProducts();
    expect(presenter.productsList).toEqual([
      {
        id: 1,
        title: "Product 1",
        price: 100,
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        image: "image3.jpg",
      },
    ]);
    await presenter.loadProducts();
    expect(presenter.productsList).toEqual([
      {
        id: 1,
        title: "Product 1",
        price: 100,
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        image: "image3.jpg",
      },
    ]);
    expect(alertSpy).toHaveBeenCalledWith("Error", "Failed to fetch products");
  });

  it("should update the cart number if it was updated from other source", async () => {
    expect(presenter.itemsInCart).toBe(0);
    const cartStore = container.get(CartStore);

    cartStore.addItem({
      id: 1,
      title: "Product 1",
      image: "image1.jpg",
      price: 100,
      description: "Description",
    });
    cartStore.addItem({
      id: 2,
      title: "Product 2",
      image: "image2.jpg",
      price: 100,
      description: "Description",
    });
    expect(presenter.itemsInCart).toBe(2);
  });
});
