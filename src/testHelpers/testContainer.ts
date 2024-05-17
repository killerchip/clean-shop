import { BaseContainer } from "../config/ioc/baseContainer";
import { Injectables } from "../config/ioc/injectables";
import { MockAxios } from "./MockAxios";

export function getTestContainer() {
  const container = new BaseContainer().buildBaseTemplate();

  container.bind(Injectables.HttpClient).toConstantValue(new MockAxios());

  return container;
}
