import { inject, injectable } from "inversify";
import { ConsoleLogger } from "./ConsoleLogger";

type IConsoleLogger = Pick<ConsoleLogger, "log">;

@injectable()
export class ErrorReportingService {
  constructor(@inject(ConsoleLogger) private _logger: IConsoleLogger) {}

  async reportError<T extends Error>(error: T, data: any) {
    // TODO: send here to a Crash reporting service like Sentry
    this._logger.log("error reported: ", error.message, data);
  }
}
