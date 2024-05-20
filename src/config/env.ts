const STAGE = process.env.EXPO_PUBLIC_STAGE ?? "TEST";

type EnvironmentVars = {
  STAGE: string;
  SHOP_API: string;
};

// if you wish to remove a variable from the checked-in code,
// then assign it from process.env.EXPO_PUBLIC_*
// but make sure it is defined on the stages you are using it

const environments: Record<string, EnvironmentVars> = {
  PROD: {
    STAGE: "PROD",
    SHOP_API: "https://fakestoreapi.com",
  },
  UAT: {
    STAGE: "UAT",
    SHOP_API: "https://fakestoreapi.com",
  },
  DEV: {
    STAGE: "DEV",
    SHOP_API: "https://fakestoreapi.com",
  },
  TEST: {
    STAGE: "TEST",
    SHOP_API: "http://localhost:3000",
  },
};

export const environment = environments[STAGE] ?? {
  STAGE,
  SHOP_API: process.env.EXPO_PUBLIC_SHOP_API,
};

export const getStageMarker = (stage = environment.STAGE) =>
  stage === "PROD" ? "" : ` - ${stage}`;
