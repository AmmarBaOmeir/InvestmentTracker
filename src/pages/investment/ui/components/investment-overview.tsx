import { SVG } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { Card, Badge, ProgressBar, Button } from "@/shared/ui";
import type { Investment } from "@/entities/asset/model/types";
import plusIcon from "@/assets/icons/plus.svg";

import {
  darkInvestmentStatusIcons,
  investmentStatusVariants,
  lightProgressColors,
} from "@/shared/helpers/consts";
import {
  calculateProgressPercentage,
  isValue1ExceedingValue2,
} from "@/shared/helpers/calculation";
import { formatCurrency, formatPercent } from "@/shared/lib";
import i18n from "@/shared/i18n";
import styles from "./overview-card.module.css";

export interface OverviewCardProps {
  invest: Investment;
  className?: string;
}

export function OverviewCard({ invest, className }: OverviewCardProps) {
  const { t } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? i18n.language;

  const investName = currentLang === "en" ? invest.name_en : invest.name_ar;
  const statusI18n = t(`investment.${invest.status}`);

  // Progress and metrics calculations
  const progressSar = calculateProgressPercentage(
    invest.total_capital_sa,
    invest.total_gained_sa,
  );
  const progressYer = calculateProgressPercentage(
    invest.total_capital_ye,
    invest.total_gained_ye,
  );
  const progressColorYer =
    lightProgressColors[
      isValue1ExceedingValue2(invest.total_gained_ye, invest.total_capital_ye)
    ];
  const progressColorSar =
    lightProgressColors[
      isValue1ExceedingValue2(invest.total_gained_sa, invest.total_capital_sa)
    ];

  const roiValue =
    invest.total_capital_sa > 0
      ? (invest.total_gained_sa / invest.total_capital_sa) * 100
      : 0;

  return (
    <Card className={[styles.bannerCard, className].filter(Boolean).join(" ")}>
      {/* Left Section: Info & Badge */}
      <div className={styles.leftSection}>
        <div className={styles.overviewActions}>
          <Button variant="secondary-soft" size="sm">
            <SVG src={plusIcon} alt={t("investment.add_return")} />
            {t("investment.add_return")}
          </Button>
          <Button variant="secondary-soft" size="sm">
            <SVG src={plusIcon} alt={t("investment.add_capital")} />
            {t("investment.add_capital")}
          </Button>
        </div>
        <div className={styles.titleRow}>
          <h2 className={styles.investName}>{investName}</h2>
          <Badge
            label={statusI18n}
            variant={investmentStatusVariants[invest.status]}
            icon={
              <SVG
                src={darkInvestmentStatusIcons[invest.status]}
                alt={statusI18n}
                fill="var(--white)"
              />
            }
            appearance="solid"
          />
        </div>
      </div>

      {/* Right Section: Progress Indicators & ROI */}
      <div className={styles.rightSection}>
        <div className={styles.titles}>
          <span>{t("investment.total_invested")}</span>
          <span>{t("investment.total_returned")}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.progressContainer}>
          <ProgressBar
            value={progressSar}
            progressColor={
              invest.status === "inactive" ? "muted" : progressColorSar
            }
            leftLabel={formatCurrency(invest.total_capital_sa)}
            rightLabel={formatCurrency(invest.total_gained_sa)}
            centerLabel={formatPercent(progressSar, "never")}
            labelColor={
              invest.status === "inactive" ? "muted" : progressColorSar
            }
          />
        </div>
        <div className={styles.progressContainer}>
          <ProgressBar
            value={progressYer}
            progressColor={
              invest.status === "inactive" ? "muted" : progressColorYer
            }
            leftLabel={formatCurrency(invest.total_capital_ye, "YER")}
            rightLabel={formatCurrency(invest.total_gained_ye, "YER")}
            centerLabel={formatPercent(progressYer, "never")}
            labelColor={
              invest.status === "inactive" ? "muted" : progressColorYer
            }
          />
        </div>

        {/* Bottom Metadata Row */}
        <div className={styles.bottomMetaRow}>
          <span className={styles.roiPercent}>
            {formatPercent(roiValue)} {t("investment.roi", "ROI")}
          </span>
        </div>
      </div>
    </Card>
  );
}
