import type { PropsWithChildren } from "react";
import { I18nProvider } from "@/app/providers/i18n-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}
