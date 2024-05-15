import { inject, injectable } from "inversify";
import { FakeShopApi } from "../dto/FakeShopApi";
import { Product } from "./products.types";
import { makeAutoObservable, runInAction } from "mobx";

type IProductsApi = Pick<FakeShopApi, "getProducts">;

@injectable()
export class ProductsStore {
  products: Product[] = [];

  constructor(@inject(FakeShopApi) private _productsApi: IProductsApi) {
    makeAutoObservable(this);
    // TODO this should be triggered by the presenter
    this.fetchProducts().then();
  }

  async fetchProducts() {
    const products = await this._productsApi.getProducts();
    runInAction(() => {
      this.products = products;
    });
  }
}
