import { render, screen } from "@testing-library/react-native";
import { CartIcon } from "./CartIcon";
import "@testing-library/react-native/extend-expect";

describe("CartIcon Component", () => {
  it("renders correctly with default size", () => {
    render(<CartIcon testID="cart-icon" />);
    expect(screen.getByTestId("cart-icon")).toHaveStyle({
      width: 36,
      height: 36,
    });
  });

  it("renders correctly with custom size", () => {
    const customSize = 48;
    render(<CartIcon size={customSize} testID="cart-icon" />);
    expect(screen.getByTestId("cart-icon")).toHaveStyle({
      width: customSize,
      height: customSize,
    });
  });

  it("does not show badge when itemsNumber is 0", () => {
    render(<CartIcon itemsNumber={0} testID="cart-icon" />);
    expect(screen.queryByTestId("cart-icon-cart-badge")).toBeNull();
  });

  it("shows badge when itemsNumber is greater than 0", () => {
    const itemsNumber = 5;
    render(<CartIcon itemsNumber={itemsNumber} testID="cart-icon" />);
    expect(screen.getByTestId("cart-icon-cart-badge")).not.toBeNull();
    expect(screen.getByTestId("cart-icon-cart-badge")).toHaveTextContent(
      itemsNumber.toString(),
    );
  });

  it("does not show badge when itemsNumber is undefined", () => {
    render(<CartIcon testID="cart-icon" />);
    expect(screen.queryByTestId("cart-icon-cart-badge")).toBeNull();
  });

  it("matches snapshot", () => {
    render(<CartIcon testID="cart-icon" itemsNumber={5} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
