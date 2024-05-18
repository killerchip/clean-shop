import { render, fireEvent, screen } from "@testing-library/react-native";
import * as Updates from "expo-updates";
import { RootErrorBoundary } from "./RootErrorBoundary";

jest.mock("expo-updates");

describe("RootErrorBoundary Component", () => {
  const errorMessage = new Error("Test Error Message");

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays the error message", () => {
    render(<RootErrorBoundary error={errorMessage} />);
    expect(screen.getByText(errorMessage.message)).toBeTruthy();
  });

  it("renders with a testID when provided", () => {
    const testID = "error-boundary";
    render(<RootErrorBoundary testID={testID} error={errorMessage} />);
    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it("calls reloadAsync on Updates when Restart the App button is pressed", () => {
    render(<RootErrorBoundary error={errorMessage} />);
    fireEvent.press(screen.getByText("Restart the App"));
    expect(Updates.reloadAsync).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    render(<RootErrorBoundary error={errorMessage} />);
    expect(screen.toJSON).toMatchSnapshot();
  });
});
