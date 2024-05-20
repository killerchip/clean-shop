import "reflect-metadata";
import { fireEvent, screen } from "@testing-library/react-native";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { useCreateProductDetailsScreenPresenter } from "@/presentation/ProductDetailsScreen.presenter";
import { renderRouter } from "expo-router/testing-library";
import { useLocalSearchParams } from "expo-router";

// TODO: fix the warning error on console. https://github.com/expo/expo/issues/28831

jest.mock("../../../presentation/ProductDetailsScreen.presenter");
// mock non existing modules
jest.mock("react-native-reanimated", () => null, {
  virtual: true,
});

jest.mock("expo-router", () => {
  const original = jest.requireActual("expo-router"); // Step 2.
  return {
    ...original,
    useLocalSearchParams: jest.fn(),
  };
});

describe("ProductDetailsScreen", () => {
  const MockComponent = jest.fn(() => <ProductDetailsScreen />);
  const mockAddProductToCart = jest.fn();
  const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "Test Description",
    price: "100",
    image: "test-image-url",
  };

  beforeEach(() => {
    (useCreateProductDetailsScreenPresenter as jest.Mock).mockReturnValue({
      addProductToCart: mockAddProductToCart,
      itemsInCart: 1,
      product: mockProduct,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("instantiates the presenter with the correct id", () => {
    (useLocalSearchParams as jest.Mock).mockImplementation(() => ({ id: "1" }));
    renderRouter(
      {
        "/product/1": MockComponent,
      },
      { initialUrl: "/product/1" },
    );

    expect(useCreateProductDetailsScreenPresenter).toHaveBeenCalledWith(1);
  });

  it("displays product details when product is available", () => {
    renderRouter(
      {
        "/product/1": MockComponent,
      },
      { initialUrl: "/product/1" },
    );

    expect(screen.getByText(mockProduct.title)).toBeTruthy();
    expect(screen.getByText(mockProduct.description)).toBeTruthy();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeTruthy();
  });

  it("displays passes the snapshot test", () => {
    renderRouter(
      {
        index: MockComponent,
        "/product/1": MockComponent,
      },
      { initialUrl: "/product/1" },
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("calls addProductToCart when add to cart button is pressed", () => {
    renderRouter(
      {
        index: MockComponent,
        "/product/1": MockComponent,
      },
      { initialUrl: "/product/1" },
    );

    fireEvent.press(screen.getByText("Add To Cart"));

    expect(mockAddProductToCart).toHaveBeenCalled();
  });

  it.skip("updates cart icon with the correct number of items in cart", () => {
    // This one does not work as the renderRouter does not include a header
    // The correctness of the badge is tested in the CartIcon component
    // and in the integration test of the presenter
    // To test the whole screen, probably need to use E2E testing
  });

  it("displays an error message when product is not available", () => {
    (useCreateProductDetailsScreenPresenter as jest.Mock).mockReturnValue({
      addProductToCart: mockAddProductToCart,
      itemsInCart: 1,
      product: undefined,
    });

    renderRouter(
      {
        index: MockComponent,
        "/product/1": MockComponent,
      },
      { initialUrl: "/product/1" },
    );

    expect(screen.getByText("Oops! No product found")).toBeTruthy();
  });
});
