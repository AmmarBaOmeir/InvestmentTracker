import { mockOverviewStats } from "@/entities/asset/model/mock";
import styles from "../investment-page.module.css";
import { StatCard } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/shared/lib";

export function InvestmentOverviewPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.overviewPage}>
      {mockOverviewStats.map((stat) => {
        return (
          <StatCard
            label={t(stat.label)}
            value={
              typeof stat.value === "number"
                ? formatCurrency(stat.value)
                : stat.value
            }
            {...(stat.icon && { icon: stat.icon })}
            tone="default"
          />
        );
      })}
    </div>
  );
}
