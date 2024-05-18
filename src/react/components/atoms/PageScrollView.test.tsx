import { render, screen } from "@testing-library/react-native";
import { PageScrollView } from "./PageScrollView";
import { View } from "react-native";
import { Text } from "react-native-paper";

describe("PageScrollView Component", () => {
  it("renders correctly", () => {
    render(
      <PageScrollView testID="pageScrollView">
        <View>
          <Text>Hello world</Text>
        </View>
      </PageScrollView>,
    );
    expect(screen.getByTestId("pageScrollView")).toBeTruthy();
  });

  it("handles empty content without crashing", () => {
    render(<PageScrollView testID="pageScrollView" />);
    // No specific assertion for empty content, just ensuring it renders without error
    expect(screen.getByTestId("pageScrollView")).toBeTruthy();
  });
});
