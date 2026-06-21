import { SVG } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import filterIcon from "@/assets/icons/filter.svg";
import { Button } from "@/shared/ui";
import styles from "@/shared/helpers/const.module.css";

type FilterButtonProps = {
  onClick: () => void;
};

export function FilterButton({ onClick }: FilterButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      aria-label={`filter`}
      title={t("common.filter")}
    >
      <span className={styles.mutedText}>{t("common.filter")}</span>
      <SVG
        src={filterIcon}
        fill="var(--text-muted)"
        size={14}
        alt={t("common.filter")}
      />
    </Button>
  );
}
