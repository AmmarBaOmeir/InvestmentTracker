import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SVG } from "@/shared/ui";
import checkIcon from "@/assets/icons/check.svg";
import trendUpIcon from "@/assets/icons/trend-up.svg";
import trendDownIcon from "@/assets/icons/trend-down.svg";
import inboxIcon from "@/assets/icons/inbox.svg";
import returnFundIcon from "@/assets/icons/fund.svg";
import whiteCheckIcon from "@/assets/icons/check.svg";
import circleDotsIcon from "@/assets/icons/circle-dots.svg";
import blockedIcon from "@/assets/icons/blocked.svg";
import type {
  CapitalData,
  InvestmentStatuses,
} from "@/entities/asset/model/types";
import { Badge, type BadgeVariant } from "../ui/badge/badge";
import type { ColumnDef } from "../ui";
import { formatCurrency } from "../lib";
import styles from "./const.module.css";

export const investmentStatusIconsColors = {
  profitable: "var(--text-success-dark)",
  match_capital: "var(--text-primary)",
  in_progress: "var(--text-warning)",
  inactive: "var(--text-error)",
};

export const investmentStatusIcons = {
  profitable: checkIcon,
  match_capital: checkIcon,
  in_progress: circleDotsIcon,
  inactive: blockedIcon,
};

export const darkInvestmentStatusIcons = {
  profitable: whiteCheckIcon,
  match_capital: whiteCheckIcon,
  in_progress: circleDotsIcon,
  inactive: blockedIcon,
};

export const investmentStatusVariants: Record<
  InvestmentStatuses,
  BadgeVariant
> = {
  profitable: "success-dark",
  match_capital: "primary",
  in_progress: "warning",
  inactive: "error",
};

export const statTones = {
  1: "positive",
  0: "default",
  "-1": "danger",
} as const;

export const statIcons = {
  1: trendUpIcon,
  0: trendUpIcon,
  "-1": trendDownIcon,
} as const;

export const statIconColor = {
  1: "var(--text-success-dark)",
  0: "var(--text)",
  "-1": "var(--text-warning)",
} as const;

export const progressColors = {
  1: "success-dark",
  0: "primary",
  "-1": "warning",
} as const;

export const lightProgressColors = {
  1: "success-light",
  0: "default",
  "-1": "warning",
} as const;

export function useInvestmentTabs() {
  const { t } = useTranslation();
  return useMemo(
    () => [
      { id: "overview", label: t("investment.overview") },
      { id: "capitals", label: t("investment.capitals") },
      { id: "returns", label: t("investment.returns") },
    ],
    [t],
  );
}

export function useCapitalColumns(): ColumnDef<CapitalData>[] {
  const { t, i18n } = useTranslation();
  return useMemo(
    () => [
      {
        key: "info",
        header: t("investment.info"),
        width: "calc(60vw - 25px)",
        render: (item) => (
          <div className={styles.investmentInfoCell}>
            <div className={styles.investmentInfoCellLeading}>
              <SVG
                src={inboxIcon}
                fill="var(--surface-2)"
                alt={t("investment.info")}
              />
            </div>
            <div>
              <div className={styles.cellMainText}>
                <span>{item.title}</span>
                <span className={styles.mutedText}>{item.date}</span>
              </div>
              <span className={styles.mutedText}>{item.note}</span>
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: t("investment.status"),
        width: "calc(20vw - 25px)",
        render: (item) => {
          const variantMap: Record<string, BadgeVariant> = {
            pending: "warning",
            inbound: "primary",
            blocked: "error",
          };
          return (
            <Badge
              label={t(`investment.${item.status}`)}
              variant={variantMap[item.status]}
            />
          );
        },
      },
      {
        key: "amounts",
        header: t("investment.amount"),
        width: "calc(20vw - 25px)",
        align: i18n.resolvedLanguage === "en" ? "right" : "left",
        render: (item) => (
          <div className={styles.amounts}>
            <span>{formatCurrency(item.amount_ye, "YER")}</span>
            <div className={styles.divider} />
            <span>{formatCurrency(item.amount_sa, "SAR")}</span>
          </div>
        ),
      },
    ],
    [t, i18n.resolvedLanguage],
  );
}

import type { ReturnData } from "@/entities/asset/model/types";

export function useReturnColumns(): ColumnDef<ReturnData>[] {
  const { t, i18n } = useTranslation();
  return useMemo(
    () => [
      {
        key: "info",
        header: t("investment.info"),
        width: "calc(60vw - 35px)",
        render: (item) => (
          <div className={styles.investmentInfoCell}>
            <div className={styles.investmentInfoCellLeading}>
              <SVG
                src={returnFundIcon}
                fill="var(--surface-2)"
                alt={t("investment.info")}
              />
            </div>
            <div>
              <div className={styles.cellMainText}>
                <span>{item.title}</span>
                <span className={styles.mutedText}>{item.date}</span>
              </div>
              <span className={styles.mutedText}>{item.note}</span>
            </div>
          </div>
        ),
      },
      {
        key: "amounts",
        header: t("investment.amount"),
        width: "calc(40vw - 35px)",
        align: i18n.resolvedLanguage === "en" ? "right" : "left",
        render: (item) => (
          <div className={styles.amounts}>
            <span>{formatCurrency(item.amount_ye, "YER")}</span>
            <div className={styles.divider} />
            <span>{formatCurrency(item.amount_sa, "SAR")}</span>
          </div>
        ),
      },
    ],
    [t, i18n.resolvedLanguage],
  );
}
