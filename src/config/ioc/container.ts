import { BaseContainer } from "./baseContainer";
import Axios from "axios";
import { Injectables } from "./injectables";

const container = new BaseContainer().buildBaseTemplate();

// Here bind the dependencies that should not be in the tests
container.bind(Injectables.HttpClient).toConstantValue(Axios);

export function getContainer() {
  return container;
}
