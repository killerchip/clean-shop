import "reflect-metadata";
import { CartStore } from "./Cart.store";
import { Product } from "./products.types";
import { reaction } from "mobx";
describe("CartStore", () => {});

describe("CartStore", () => {
  let cartStore: CartStore;
  let product: Product;

  beforeEach(() => {
    cartStore = new CartStore();
    product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test Description",
      image: "test.jpg",
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should start with an empty items array", () => {
    expect(cartStore.items).toEqual([]);
  });

  it("should make props observable automatically", () => {
    const mobx = require("mobx");
    const makeObservableSpy = jest.spyOn(mobx, "makeAutoObservable");
    cartStore = new CartStore();
    expect(makeObservableSpy).toHaveBeenCalledWith(cartStore);
    expect(makeObservableSpy).toHaveBeenCalledTimes(1);
  });

  it("should add an item to the cart", () => {
    cartStore.addItem(product);
    expect(cartStore.items).toContainEqual(product);
  });

  it("should allow adding multiple items to the cart", () => {
    const product2 = {
      id: 2,
      title: "Another Test Product",
      price: 200,
      description: "Another Test Description",
      image: "test2.jpg",
    };
    cartStore.addItem(product);
    cartStore.addItem(product2);
    expect(cartStore.items).toEqual(
      expect.arrayContaining([product, product2]),
    );
  });

  it("should ensure observable state changes when adding products", async () => {
    expect(cartStore.items.length).toEqual(0);
    let length = 0;

    const dispose = reaction(
      () => cartStore.items.length,
      (items) => {
        length = items;
      },
    );

    // Call fetchProducts
    cartStore.addItem(product);
    cartStore.addItem(product);
    expect(length).toBe(2);
    dispose();
  });
});
