import { injectable } from "inversify";
import { Product } from "../domain/products.types";
import { ProductDto, toProduct } from "./products.dto";
import { SHOP_API } from "../config/env";

@injectable()
export class FakeShopApi {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${SHOP_API}/products/`);
    const data = (await response.json()) as ProductDto[];

    return data.map(toProduct);
  }
}
