import { useState } from "react";
import type { InvestmentOverviewStatGroup } from "@/pages/investment/model/overview-stats";
import styles from "../investment-page.module.css";
import { StatCard, SVG } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { cn, formatCurrency } from "@/shared/lib";
import arrowIcon from "@/assets/icons/arrow.svg";

interface InvestmentOverviewPageProps {
  overviewStats: InvestmentOverviewStatGroup[];
}

export function InvestmentOverviewPage({
  overviewStats,
}: InvestmentOverviewPageProps) {
  const { t } = useTranslation();
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  };

  return (
    <div className={styles.overviewPage}>
      {overviewStats.map((group) => {
        const isCollapsed = collapsedGroups[group.id] ?? false;

        return (
          <section key={group.id} className={styles.overviewGroup}>
            <button
              type="button"
              className={styles.overviewGroupHeader}
              onClick={() => toggleGroup(group.id)}
              aria-expanded={!isCollapsed}
              aria-controls={`overview-group-${group.id}`}
            >
              <span className={styles.overviewGroupTitleContent}>
                <SVG
                  src={group.icon}
                  size={16}
                  className={styles.overviewGroupIcon}
                  aria-hidden
                />
                <span className={styles.overviewGroupTitle}>
                  {t(group.title)}
                </span>
              </span>
              <SVG
                src={arrowIcon}
                size={12}
                className={cn(
                  styles.overviewGroupIcon,
                  styles.overviewGroupArrow,
                  isCollapsed && styles.overviewGroupArrowCollapsed,
                )}
                aria-hidden
              />
            </button>
            <div
              id={`overview-group-${group.id}`}
              className={cn(
                styles.overviewGroupCardsShell,
                isCollapsed && styles.overviewGroupCardsCollapsed,
              )}
            >
              <div className={styles.overviewGroupCards}>
                {group.items.map((stat) => (
                  <StatCard
                    key={stat.id}
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
            </div>
          </section>
        );
      })}
    </div>
  );
}
