import "reflect-metadata";
import { ProductsScreen } from "./ProductsScreen";
import { renderRouter, screen } from "expo-router/testing-library";
import { useNewDependency } from "../../../config/ioc/useDependency.react";

jest.mock("../../../config/ioc/useDependency.react");
jest.mock("react-native-reanimated", () => null, {
  virtual: true,
});

describe("ProductsScreen", () => {
  const MockComponent = jest.fn(() => <ProductsScreen />);
  let loadProductsMock: jest.Mock;

  beforeEach(() => {
    loadProductsMock = jest.fn();

    (useNewDependency as jest.Mock).mockReturnValue({
      itemsInCart: 2,
      isFirstFetch: true,
      isFetching: false,
      loadProducts: loadProductsMock,
      productsList: [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          image: "image-url-1",
        },
        {
          id: 2,
          title: "Product 2",
          price: 200,
          image: "image-url-2",
        },
      ],
    });
  });

  it("renders products list when products are available", () => {
    renderRouter({
      index: MockComponent,
    });

    expect(screen.getByText("Product 1")).toBeTruthy();
    expect(screen.getByText("Product 2")).toBeTruthy();
  });

  it.skip("displays cart icon with correct number of items", () => {
    // This one does not work as the renderRouter does not include a header
    // The correctness of the badge is tested in the CartIcon component
    // and in the integration test of the presenter
    // To test the whole screen, probably need to use E2E testing
  });

  it("shows empty list component when no products are available", () => {
    (useNewDependency as jest.Mock).mockReturnValue({
      itemsInCart: 2,
      isFirstFetch: false,
      isFetching: false,
      loadProducts: loadProductsMock,
      productsList: [],
    });

    renderRouter({
      index: MockComponent,
    });

    // expect(screen.getByText("Nothing here :-(")).toBeTruthy();
    expect(screen.getByText("Pull to refresh")).toBeTruthy();
  });

  it("it does not show Empty Component when is first fetch", () => {
    (useNewDependency as jest.Mock).mockReturnValue({
      itemsInCart: 2,
      isFirstFetch: true,
      isFetching: false,
      loadProducts: loadProductsMock,
      productsList: [],
    });

    renderRouter({
      index: MockComponent,
    });

    expect(screen.queryByText("Pull to refresh")).toBeFalsy();
  });

  it("refreshes products list on pull down", async () => {
    renderRouter({
      index: MockComponent,
    });

    const refreshControl = screen.getByTestId("products-list");
    refreshControl.props.onRefresh();

    // fireEvent(refreshControl, "onRefresh");
    //
    expect(loadProductsMock).toHaveBeenCalled();
  });
});
