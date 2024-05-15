import { injectable } from "inversify";
import { Product } from "../domain/products.types";
import { ProductDto, toProduct } from "./products.dto";

@injectable()
export class FakeShopApi {
  async getProducts(): Promise<Product[]> {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = (await response.json()) as ProductDto[];

    return data.map(toProduct);
  }
}
