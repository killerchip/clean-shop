import { inject, injectable } from "inversify";
import { ProductsStore } from "../domain/Products.store";
import { makeAutoObservable, runInAction } from "mobx";
import { toProductListItem } from "./products.views";
import { CartStore } from "../domain/Cart.store";
import { ErrorAlertingService } from "../services/ErrorAlertingService";

type IProductStore = Pick<ProductsStore, "products" | "fetchProducts">;
type ICartStore = Pick<CartStore, "items">;
type IErrorAlertingService = Pick<ErrorAlertingService, "alert">;

@injectable()
export class ProductsScreenPresenter {
  isFetching = false;
  isFirstFetch = true;

  constructor(
    @inject(ProductsStore) private _productsStore: IProductStore,
    @inject(CartStore) private _cartStore: ICartStore,
    @inject(ErrorAlertingService)
    private _errorAlertingService: IErrorAlertingService,
  ) {
    makeAutoObservable(this);
  }

  async loadProducts() {
    runInAction(() => {
      this.isFetching = true;
    });

    try {
      await this._productsStore.fetchProducts();
    } catch {
      runInAction(() => {
        this._errorAlertingService.alert("Error", "Failed to fetch products");
      });
    } finally {
      runInAction(() => {
        this.isFetching = false;
        this.isFirstFetch = false;
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
