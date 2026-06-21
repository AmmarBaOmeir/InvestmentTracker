import { useTranslation } from "react-i18next";
import { SVG } from "@/shared/ui";
import userSnap from "@/assets/icons/user.svg";
import { Button } from "@/shared/ui";

export function UserNavigationSnap() {
  const { t } = useTranslation();
  const tempUser = "Ammar BaOmeir";

  const openUserSnap = () => {
    // open user menu
  };

  return (
    <Button
      variant="ghost"
      onClick={() => openUserSnap()}
      aria-label={`Currrent user: ${tempUser}`}
      title={tempUser}
    >
      <SVG src={userSnap} alt={t("common.user_snap")} />
    </Button>
  );
}
