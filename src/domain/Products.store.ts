import { inject, injectable } from "inversify";
import { ShopApi } from "@/dto/ShopApi";
import { Product } from "./products.types";
import { makeAutoObservable, runInAction } from "mobx";

type IProductsApi = Pick<ShopApi, "getProducts">;

@injectable()
export class ProductsStore {
  products: Product[] = [];

  constructor(@inject(ShopApi) private _productsApi: IProductsApi) {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    const products = await this._productsApi.getProducts();

    runInAction(() => {
      this.products = products;
    });
  }
}
