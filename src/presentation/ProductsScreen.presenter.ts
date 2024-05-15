import { inject, injectable } from "inversify";
import { ProductsStore } from "../domain/Products.store";

@injectable()
export class ProductsScreenPresenter {
  constructor(@inject(ProductsStore) private _productsStore: ProductsStore) {}
}
