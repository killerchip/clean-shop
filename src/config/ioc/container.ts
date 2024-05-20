import { BaseContainer } from "./baseContainer";
import Axios from "axios";
import { Injectables } from "./injectables";

const container = new BaseContainer().buildBaseTemplate();

// Here bind the dependencies that should be mocked in tests
// Here we bind their real implementations
// This container is used by production code
container.bind(Injectables.HttpClient).toConstantValue(Axios);

export function getContainer() {
  return container;
}
