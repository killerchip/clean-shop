import { Container } from "inversify";
import { FakeShopApi } from "../dto/FakeShopApi";
import { ProductsStore } from "../domain/Products.store";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Transient",
});

// Stores and some gateways should be singletons
container.bind(FakeShopApi).toSelf().inSingletonScope();
container.bind(ProductsStore).toSelf().inSingletonScope();

export function getContainer() {
  return container;
}
