import { injectable } from "inversify";

@injectable()
export class ErrorReportingService {
  async reportError<T extends Error>(error: T, data: any) {
    // TODO: send here to a Crash reporting service like Sentry
    console.log("error reported: ", error.message, data);
  }
}
