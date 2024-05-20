import { Container } from "inversify";
import { ShopApi } from "@/dto/ShopApi";
import { ProductsStore } from "@/domain/Products.store";
import { CartStore } from "@/domain/Cart.store";
import { ErrorReportingService } from "@/services/ErrorReportingService";
import { ErrorAlertingService } from "@/services/ErrorAlertingService";

export class BaseContainer {
  container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  buildBaseTemplate = () => {
    // Here we bind classes and services in Singleton scope.
    this.container.bind(ShopApi).toSelf().inSingletonScope();
    this.container.bind(ProductsStore).toSelf().inSingletonScope();
    this.container.bind(CartStore).toSelf().inSingletonScope();
    this.container.bind(ErrorReportingService).toSelf().inSingletonScope();
    this.container.bind(ErrorAlertingService).toSelf().inSingletonScope();

    return this.container;
  };
}
