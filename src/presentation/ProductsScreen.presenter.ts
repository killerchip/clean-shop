import { inject, injectable } from "inversify";
import { ProductsStore } from "../domain/Products.store";
import { makeAutoObservable, runInAction } from "mobx";
import { toProductListItem } from "./products.views";
import { CartStore } from "../domain/Cart.store";

type IProductStore = Pick<ProductsStore, "products" | "fetchProducts">;
type ICartStore = Pick<CartStore, "items">;

@injectable()
export class ProductsScreenPresenter {
  isFetching = false;

  constructor(
    @inject(ProductsStore) private _productsStore: IProductStore,
    @inject(CartStore) private _cartStore: ICartStore,
  ) {
    makeAutoObservable(this);
    this.loadProducts().then();
  }

  async loadProducts() {
    runInAction(() => {
      this.isFetching = true;
    });

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

  get itemsInCart() {
    return this._cartStore.items.length;
  }
}
