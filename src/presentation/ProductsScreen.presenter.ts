import { inject, injectable } from "inversify";
import { ProductsStore } from "../domain/Products.store";
import { runInAction } from "mobx";
import { toProductListItem } from "./products.views";

@injectable()
export class ProductsScreenPresenter {
  isFetching = false;
  constructor(@inject(ProductsStore) private _productsStore: ProductsStore) {
    this._productsStore.fetchProducts().then();
    this.loadProducts().then();
  }

  async loadProducts() {
    this.isFetching = true;

    try {
      await this._productsStore.fetchProducts();
    } finally {
      // TODO: handle error
      runInAction(() => {
        this.isFetching = false;
      });
    }
  }

  get productsList() {
    return this._productsStore.products.map(toProductListItem);
  }
}
