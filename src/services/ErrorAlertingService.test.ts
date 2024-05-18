import "reflect-metadata";
import { Alert } from "react-native";
import { ErrorAlertingService } from "./ErrorAlertingService";

describe("ErrorAlertingService", () => {
  let errorAlertingService: ErrorAlertingService;
  let spyAlert: jest.SpyInstance;

  beforeEach(() => {
    spyAlert = jest.spyOn(Alert, "alert");
    errorAlertingService = new ErrorAlertingService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should display alert with both title and message", () => {
    errorAlertingService.alert("Error Title", "Error message");

    expect(spyAlert).toHaveBeenCalledWith("Error Title", "Error message");
  });

  it("should display alert with only title when message is not provided", () => {
    errorAlertingService.alert("Error Title");

    expect(spyAlert).toHaveBeenCalledWith("Error Title", undefined);
  });
});
