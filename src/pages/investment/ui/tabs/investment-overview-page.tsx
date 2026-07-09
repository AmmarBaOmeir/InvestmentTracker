import type { InvestmentOverviewStatItem } from "@/pages/investment/model/overview-stats";
import styles from "../investment-page.module.css";
import { StatCard } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/shared/lib";

interface InvestmentOverviewPageProps {
  overviewStats: InvestmentOverviewStatItem[];
}

export function InvestmentOverviewPage({
  overviewStats,
}: InvestmentOverviewPageProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.overviewPage}>
      {overviewStats.map((stat) => (
        <StatCard
          key={stat.label}
          label={t(stat.label)}
          value={
            typeof stat.value === "number"
              ? formatCurrency(stat.value, stat.currency ?? "SAR")
              : stat.value
          }
          {...(stat.icon ? { icon: stat.icon } : {})}
          tone="default"
        />
      ))}
    </div>
  );
}
