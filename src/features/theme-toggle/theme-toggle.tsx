import { useTranslation } from "react-i18next";
import darkModeIcon from "@/assets/icons/dark-mode.svg";
import lightModeIcon from "@/assets/icons/light-mode.svg";
import { Button, SVG } from "@/shared/ui";
import { useTheme } from "@/app/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={t(
        theme === "dark" ? "common.switch_to_light" : "common.switch_to_dark",
      )}
    >
      <SVG src={theme === "dark" ? lightModeIcon : darkModeIcon} />
    </Button>
  );
}
