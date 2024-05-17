import { inject, injectable } from "inversify";
import { Product } from "../domain/products.types";
import { toProduct } from "./products.dto";
import { SHOP_API } from "../config/env";
import Axios from "axios";
import { ErrorReportingService } from "../services/ErrorReportingService";

@injectable()
export class ShopApi {
  constructor(
    @inject(ErrorReportingService)
    private _errorReportingService: ErrorReportingService,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      const response = await Axios.get(`${SHOP_API}/products/`);
      return response.data.map(toProduct);
    } catch (error: unknown) {
      this._errorReportingService.reportError(error as Error).then();
      throw error;
    }
  }
}
