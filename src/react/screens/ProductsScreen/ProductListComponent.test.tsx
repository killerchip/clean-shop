import { render, fireEvent, screen } from "@testing-library/react-native";
import { ProductListItemComponent } from "./ProductListItemComponent";
import { useRouter } from "expo-router";

jest.mock("expo-router");

describe("ProductListItemComponent", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "Test Description",
    price: 100,
    image: "test-image-url",
  };

  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders product details correctly", () => {
    render(<ProductListItemComponent product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeTruthy();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeTruthy();
  });

  it("matches snapshot", () => {
    render(<ProductListItemComponent product={mockProduct} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("navigates to product detail page on press", () => {
    render(<ProductListItemComponent product={mockProduct} testID="item" />);

    fireEvent.press(screen.getByTestId("item-pressable-area"));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: `/product/${mockProduct.id}`,
    });
  });
});
