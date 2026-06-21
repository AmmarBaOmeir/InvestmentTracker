import { SVG } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import filterIcon from "@/assets/icons/filter.svg";
import xmarkIcon from "@/assets/icons/xmark.svg";
import { Button } from "@/shared/ui";
import styles from "@/shared/helpers/const.module.css";

type FilterButtonProps = {
  onClick: () => void;
  hasFilter?: boolean;
  onClear?: () => void;
};

export function FilterButton({
  onClick,
  hasFilter,
  onClear,
}: FilterButtonProps) {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
      {hasFilter && onClear && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          aria-label={t("common.clear")}
          title={t("common.clear")}
        >
          <SVG
            src={xmarkIcon}
            fill="var(--text-muted)"
            size={14}
            alt={t("common.clear")}
          />
        </Button>
      )}
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
    </div>
  );
}
