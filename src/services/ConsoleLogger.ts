import { injectable } from "inversify";

// For performance reasons, we don't want to log anything in production
// So we only log in development

// Use this class for permanent logging statements
// Use console.log for temporary logging statements (they will picked up by eslint)

@injectable()
export class ConsoleLogger {
  log(...args: any[]) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
}
