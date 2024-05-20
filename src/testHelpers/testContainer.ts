import { BaseContainer } from "@/config/ioc/baseContainer";
import { Injectables } from "@/config/ioc/injectables";
import { getMockAxios } from "./MockAxios";

const getDefaultConfig = () => ({
  MockAxios: getMockAxios(),
});

export type TestContainerConfig = ReturnType<typeof getDefaultConfig>;

// This test container is used by tests
// It binds mocked dependencies of external libraries and UI components that we don't want to use
// in state logic tests

export function getTestContainer(config: Partial<TestContainerConfig> = {}) {
  const container = new BaseContainer().buildBaseTemplate();

  const finalConfig = { ...getDefaultConfig(), ...config };
  container.bind(Injectables.HttpClient).toConstantValue(finalConfig.MockAxios);

  return { container, mocks: finalConfig };
}
