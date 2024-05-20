import "reflect-metadata";
import { ProductDetailsScreenPresenter } from "./ProductDetailsScreen.presenter";
import { ProductsStore } from "@/domain/Products.store";
import { CartStore } from "@/domain/Cart.store";
import { Product } from "@/domain/products.types";
import { makeObservable, reaction, runInAction } from "mobx";

describe("ProductDetailsScreenPresenter", () => {
  let presenter: ProductDetailsScreenPresenter;
  let productStore: Pick<ProductsStore, "products">;
  let cartStore: Pick<CartStore, "addItem" | "items">;
  let products: Product[];

  beforeEach(() => {
    products = [
      {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "Description 1",
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 20,
        description: "Description 2",
        image: "image2.jpg",
      },
    ];
    productStore = { products };
    cartStore = { addItem: jest.fn(), items: [] };
    makeObservable(cartStore.items);
    presenter = new ProductDetailsScreenPresenter(productStore, cartStore);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize correctly and immediately", () => {
    expect(presenter).toBeDefined();
    expect(presenter.productId).toBe(0);
  });

  it("makes the productId observable", () => {
    let ids: number[] = [];
    const dispose = reaction(
      () => presenter.productId,
      (id) => {
        ids.push(id);
      },
    );

    runInAction(() => {
      presenter.productId = 1;
    });
    runInAction(() => {
      presenter.productId = 2;
    });

    expect(ids).toEqual([1, 2]);
    dispose();
  });

  it("should init by setting the productId", () => {
    presenter.init(2);
    expect(presenter.productId).toBe(2);
  });

  it("should return the product details", () => {
    presenter.init(1);
    expect(presenter.product).toEqual(products[0]);

    presenter.init(2);
    expect(presenter.product).toEqual(products[1]);
  });

  it("should return undefined if product is not found", () => {
    presenter.init(3);
    expect(presenter.product).toBeUndefined();
  });

  it("should add product to cart", () => {
    presenter.init(1);
    presenter.addProductToCart();
    expect(cartStore.addItem).toHaveBeenCalledWith(products[0]);
  });

  it("should return the number of items in cart", () => {
    expect(presenter.itemsInCart).toBe(0);

    presenter.init(1);
    runInAction(() => {
      cartStore.items.push(products[0]);
      cartStore.items.push(products[1]);
    });
    expect(presenter.itemsInCart).toBe(2);
  });
});
