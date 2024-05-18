import { inject, injectable } from "inversify";
import { ProductsStore } from "../domain/Products.store";
import { action, makeAutoObservable } from "mobx";
import { Product } from "../domain/products.types";
import { ProductDetails } from "./products.views";
import { useNewDependency } from "../config/ioc/useDependency.react";
import { CartStore } from "../domain/Cart.store";

type IProductStore = Pick<ProductsStore, "products">;
type ICartStore = Pick<CartStore, "addItem" | "items">;

@injectable()
export class ProductDetailsScreenPresenter {
  productId: Product["id"] = 0;

  constructor(
    @inject(ProductsStore) private _productsStore: IProductStore,
    @inject(CartStore) private _cartStore: ICartStore,
  ) {
    makeAutoObservable(this);
  }

  init(productId: Product["id"]) {
    this.productId = productId;
  }

  get product(): ProductDetails | undefined {
    return this._productsStore.products.find((p) => p.id === this.productId);
  }

  addProductToCart() {
    this._cartStore.addItem(this.product!);
  }

  get itemsInCart() {
    return this._cartStore.items.length;
  }
}

export function useCreateProductDetailsScreenPresenter(
  productId: Product["id"],
) {
  return useNewDependency(
    ProductDetailsScreenPresenter,
    action((presenter) => presenter.init(productId)),
  );
}
