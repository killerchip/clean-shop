import { render, screen } from "@testing-library/react-native";
import { EmptyListComponent } from "./EmptyListComponent";

describe("EmptyListComponent", () => {
  it("displays the correct empty messages", () => {
    render(<EmptyListComponent />);
    expect(screen.getByText("Nothing here :-(")).toBeTruthy();
    expect(screen.getByText("Pull to refresh")).toBeTruthy();
  });

  it("has proper styling for the container", () => {
    render(<EmptyListComponent testID="container" />);
    const container = screen.getByTestId("container");
    expect(container.props.style).toMatchObject({
      flexGrow: 1,
      flexShrink: 1,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
    });
  });
});
