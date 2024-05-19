export const SHOP_API =
  process.env.EXPO_PUBLIC_SHOP_API ?? "http://localhost:3000";

export const STAGE = process.env.EXPO_PUBLIC_STAGE ?? "TEST";
export const getStageMarker = (stage = STAGE) =>
  stage === "PROD" ? "" : ` - ${stage}`;
