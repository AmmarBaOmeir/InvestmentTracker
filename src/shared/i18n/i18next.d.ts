import "i18next";
import type en from "./locales/en/translation.json";
import type enApi from "./locales/en/api.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof en; api: typeof enApi };
  }
}
