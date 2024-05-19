import { inject, injectable } from "inversify";
import { Product } from "../domain/products.types";
import { toProduct } from "./products.dto";
import { environment } from "../config/env";
import Axios from "axios";
import { ErrorReportingService } from "../services/ErrorReportingService";

import { Injectables } from "../config/ioc/injectables";

type IErrorReportingService = Pick<ErrorReportingService, "reportError">;

@injectable()
export class ShopApi {
  constructor(
    @inject(ErrorReportingService)
    private _errorReportingService: IErrorReportingService,
    @inject(Injectables.HttpClient) private _httpClient: typeof Axios,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this._httpClient.get(
        `${environment.SHOP_API}/products/`,
      );
      return response.data.map(toProduct);
    } catch (error: unknown) {
      this._errorReportingService.reportError(error as Error).then();
      throw error;
    }
  }
}
