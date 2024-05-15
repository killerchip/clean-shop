import { injectable } from "inversify";

@injectable()
export class FakeShopApi {
  async getProducts() {
    return [
      {
        id: 1,
        name: "Product 1",
        price: 100,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
      },
    ];
  }
}
