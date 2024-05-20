import { getStageMarker } from "./env";

describe("getStageMarker functionality", () => {
  it("should return empty string for PROD stage", () => {
    const marker = getStageMarker("PROD");
    expect(marker).toEqual("");
  });

  it('should return " - STAGE" for all others', () => {
    const marker = getStageMarker("A_STAGE");
    expect(marker).toEqual(" - A_STAGE");
  });
});
