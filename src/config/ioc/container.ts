import { Container } from "inversify";
import { FakeShopApi } from "../../dto/FakeShopApi";
import { ProductsStore } from "../../domain/Products.store";
import { CartStore } from "../../domain/Cart.store";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Transient",
});

// Stores and some gateways should be singletons
container.bind(FakeShopApi).toSelf().inSingletonScope();
container.bind(ProductsStore).toSelf().inSingletonScope();
container.bind(CartStore).toSelf().inSingletonScope();

export function getContainer() {
  return container;
}
