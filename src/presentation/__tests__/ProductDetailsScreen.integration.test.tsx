import "reflect-metadata";
import { Container } from "inversify";
import { getTestContainer } from "@/testHelpers/testContainer";
import { ProductDetailsScreenPresenter } from "../ProductDetailsScreen.presenter";
import { ProductsStore } from "@/domain/Products.store";

describe("ProductDetailsScreen", () => {
  let container: Container;
  let presenter: ProductDetailsScreenPresenter;
  let productsStore: ProductsStore;

  beforeEach(async () => {
    // TODO: probably the idea here is better to prepare the container each time,
    // so it's obvious how the tests being setup
    ({ container } = getTestContainer());

    // to reach into this screen the products have already been loaded
    productsStore = container.get(ProductsStore);
    await productsStore.fetchProducts();

    presenter = container.get(ProductDetailsScreenPresenter);
    presenter.init(1); // presenter is always initialized with a product id
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize correctly and immediately", async () => {
    expect(presenter.productId).toBe(1);
  });

  it("should display product details", () => {
    expect(presenter.product).toEqual({
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description 1",
      image: "image1.jpg",
    });
  });

  it("should add product to cart and reflect their numbers", () => {
    expect(presenter.itemsInCart).toBe(0);
    presenter.addProductToCart();
    expect(presenter.itemsInCart).toBe(1);
    presenter.addProductToCart();
    expect(presenter.itemsInCart).toBe(2);
  });
});
