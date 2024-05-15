import { inject, injectable } from "inversify";
import { FakeShopApi } from "../dto/FakeShopApi";

@injectable()
export class ProductsStore {
  constructor(@inject(FakeShopApi) private _fakeShopApi: FakeShopApi) {}
}
