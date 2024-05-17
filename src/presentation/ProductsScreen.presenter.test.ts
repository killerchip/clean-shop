import "reflect-metadata";
import { ProductsScreenPresenter } from "./ProductsScreen.presenter";
import { ProductsStore } from "../domain/Products.store";
import { CartStore } from "../domain/Cart.store";
import { ErrorAlertingService } from "../services/ErrorAlertingService";
import { Product } from "../domain/products.types";
import { ProductListItem, toProductListItem } from "./products.views";
import { observable, reaction, runInAction } from "mobx";

describe("ProductsScreenPresenter", () => {
  let productsStore: Pick<ProductsStore, "fetchProducts" | "products">;
  let cartStore: CartStore;
  let errorAlertingService: Pick<ErrorAlertingService, "alert">;
  let presenter: ProductsScreenPresenter;
  let products: Product[];
  let listItems: ProductListItem[];

  beforeEach(() => {
    products = [
      {
        id: 1,
        title: "Test Product",
        price: 100,
        description: "Test Description",
        image: "test.jpg",
      },
      {
        id: 2,
        title: "Another Test Product",
        price: 200,
        description: "Another Test Description",
        image: "test2.jpg",
      },
    ];
    listItems = products.map(toProductListItem);

    // Mock dependencies
    productsStore = {
      fetchProducts: jest.fn().mockResolvedValue(products),
      products: observable([]),
    };
    cartStore = new CartStore();
    errorAlertingService = {
      alert: jest.fn(),
    };
    presenter = new ProductsScreenPresenter(
      productsStore,
      cartStore,
      errorAlertingService,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize correctly and immediately", () => {
      expect(presenter.isFetching).toBe(false);
      expect(presenter.isFirstFetch).toBe(true);
    });
  });

  describe("loadProducts", () => {
    describe("when loading is successful", () => {
      it("should set isFetching correctly", async () => {
        expect(presenter.productsList).toEqual([]);
        expect(presenter.isFetching).toBe(false);
        const isFetchingValues: boolean[] = [];
        const dispose = reaction(
          () => presenter.isFetching,
          (isFetching) => {
            isFetchingValues.push(isFetching);
          },
        );
        await presenter.loadProducts();
        expect(isFetchingValues).toEqual([true, false]);
        dispose();
      });
      it("should update isFirstFetch correctly", async () => {
        expect(presenter.productsList).toEqual([]);
        expect(presenter.isFirstFetch).toBe(true);
        const isFirstFetchValues: boolean[] = [];
        const dispose = reaction(
          () => presenter.isFirstFetch,
          (isFirstFetch) => {
            isFirstFetchValues.push(isFirstFetch);
          },
        );
        await presenter.loadProducts();
        expect(isFirstFetchValues).toEqual([false]);
        await presenter.loadProducts();
        expect(isFirstFetchValues).toEqual([false]);
        dispose();
      });
    });

    describe("when loading fails", () => {
      beforeEach(() => {
        productsStore = {
          fetchProducts: jest.fn().mockRejectedValue(new Error("Mock Error")),
          products: [],
        };
        presenter = new ProductsScreenPresenter(
          productsStore,
          cartStore,
          errorAlertingService,
        );
      });

      it("should handle errors correctly", async () => {
        await expect(presenter.loadProducts()).resolves.toBeUndefined();
        expect(errorAlertingService.alert).toHaveBeenCalledWith(
          "Error",
          "Failed to fetch products",
        );
      });

      it("should set isFetching correctly", async () => {
        expect(presenter.isFetching).toBe(false);
        const isFetchingValues: boolean[] = [];
        const dispose = reaction(
          () => presenter.isFetching,
          (isFetching) => {
            isFetchingValues.push(isFetching);
          },
        );
        await presenter.loadProducts();
        expect(isFetchingValues).toEqual([true, false]);
        dispose();
      });
    });
  });

  describe("productsList", () => {
    it.only("should correctly transform products to list items", async () => {
      const dispose = reaction(
        () => presenter.productsList,
        (productsList) => {},
      );
      expect(presenter.productsList).toEqual([]);
      runInAction(() => {
        productsStore.products.push(...products);
      });
      expect(presenter.productsList).toEqual(listItems);
      dispose();
    });
  });

  describe("itemsInCart", () => {
    it("should report the correct number of items in the cart", () => {
      expect(presenter.itemsInCart).toBe(0);
      cartStore.addItem(products[0]);
      expect(presenter.itemsInCart).toBe(1);
      cartStore.addItem(products[1]);
      expect(presenter.itemsInCart).toBe(2);
    });
  });
});
