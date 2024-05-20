import { interfaces } from "inversify";
import { createContext, useContext as useContextReact, useState } from "react";

import { getContainer } from "./container";

// use inside react tree to define to instantiate a new presenter
export function useNewDependency<T>(
  identifier: interfaces.ServiceIdentifier<T>,
  init?: (dependency: T) => void,
): T {
  const container = getContainer();
  const [dependency] = useState(() => {
    const obtained = container.get<T>(identifier);
    if (init) {
      init(obtained);
    }
    return obtained;
  });

  return dependency;
}

// create a provider and hook to distribute a dependency down the react tree if needed
// noinspection JSUnusedGlobalSymbols
export function createDependencyContext<T>() {
  const Context = createContext<T | null>(null);
  const useContext = () => {
    const presenter = useContextReact(Context);
    if (!presenter) {
      throw new Error(
        ["Context Value was not found", Context.displayName].join(" : "),
      );
    }

    return presenter;
  };

  return { Provider: Context.Provider, useContext };
}
