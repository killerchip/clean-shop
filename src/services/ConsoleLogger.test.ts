import "reflect-metadata";
import { ConsoleLogger } from "./ConsoleLogger";

describe("ConsoleLogger", () => {
  let consoleLogger: ConsoleLogger;
  let spyConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    consoleLogger = new ConsoleLogger();
    spyConsoleLog = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log message in development mode", () => {
    // @ts-expect-error
    global.__DEV__ = true; // Simulate development mode
    const message = "Test message";
    consoleLogger.log(message);

    expect(spyConsoleLog).toHaveBeenCalledWith(message);
  });

  it("should not log message in production mode", () => {
    // @ts-expect-error
    global.__DEV__ = false; // Simulate production mode
    consoleLogger.log("Test message");

    expect(spyConsoleLog).not.toHaveBeenCalled();
  });

  it("should log multiple arguments in development mode", () => {
    // @ts-expect-error
    global.__DEV__ = true; // Simulate development mode
    const args = ["Test message", { key: "value" }, 123];
    consoleLogger.log(...args);

    expect(spyConsoleLog).toHaveBeenCalledWith(...args);
  });
});
