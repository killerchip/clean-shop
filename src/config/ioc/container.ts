import { Container } from "inversify";
import { ShopApi } from "../../dto/ShopApi";
import { ProductsStore } from "../../domain/Products.store";
import { CartStore } from "../../domain/Cart.store";
import { ErrorReportingService } from "../../services/ErrorReportingService";
import { ErrorAlertingService } from "../../services/ErrorAlertingService";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Transient",
});

// Stores and some gateways should be singletons
container.bind(ShopApi).toSelf().inSingletonScope();
container.bind(ProductsStore).toSelf().inSingletonScope();
container.bind(CartStore).toSelf().inSingletonScope();
container.bind(ErrorReportingService).toSelf().inSingletonScope();
container.bind(ErrorAlertingService).toSelf().inSingletonScope();

export function getContainer() {
  return container;
}
