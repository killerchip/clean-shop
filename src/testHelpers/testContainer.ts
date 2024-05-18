import { BaseContainer } from "../config/ioc/baseContainer";
import { Injectables } from "../config/ioc/injectables";
import { getMockAxios } from "./MockAxios";

const getDefaultConfig = () => ({
  MockAxios: getMockAxios(),
});

export type TestContainerConfig = ReturnType<typeof getDefaultConfig>;

export function getTestContainer(config: Partial<TestContainerConfig> = {}) {
  const container = new BaseContainer().buildBaseTemplate();

  const finalConfig = { ...getDefaultConfig(), ...config };

  container.bind(Injectables.HttpClient).toConstantValue(finalConfig.MockAxios);

  return { container, mocks: finalConfig };
}
