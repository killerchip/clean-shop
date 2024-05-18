import "reflect-metadata";
import { ErrorReportingService } from "./ErrorReportingService";
import { ConsoleLogger } from "./ConsoleLogger";

describe("ErrorReportingService", () => {
  let errorReportingService: ErrorReportingService;
  let loggerMock: Pick<ConsoleLogger, "log">;

  beforeEach(() => {
    loggerMock = {
      log: jest.fn(),
    };
    errorReportingService = new ErrorReportingService(
      loggerMock as ConsoleLogger,
    );
  });

  it("should log error message and data when reportError is called", async () => {
    const error = new Error("Test error");
    const data = { key: "value" };

    await errorReportingService.reportError(error, data);

    expect(loggerMock.log).toHaveBeenCalledWith(
      "error reported: ",
      error.message,
      data,
    );
  });

  it("should log error message without data when reportError is called without data", async () => {
    const error = new Error("Test error");

    await errorReportingService.reportError(error);

    expect(loggerMock.log).toHaveBeenCalledWith(
      "error reported: ",
      error.message,
      undefined,
    );
  });
});
