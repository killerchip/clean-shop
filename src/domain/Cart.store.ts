import { injectable } from "inversify";
import { Product } from "./products.types";
import { makeAutoObservable } from "mobx";

@injectable()
export class CartStore {
  items: Product[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  addItem(item: Product) {
    this.items.push(item);
  }
}
