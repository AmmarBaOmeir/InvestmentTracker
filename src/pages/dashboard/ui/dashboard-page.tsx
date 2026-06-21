import { SVG } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import saudiRialIcon from "@/assets/icons/saudi-rial.svg";
import yemeniRialIcon from "@/assets/icons/yemeni-rial.svg";
import { mockAssets } from "@/entities/asset";
import { Badge, Card, ProgressBar, StatCard } from "@/shared/ui";
import { formatCurrency, formatPercent } from "@/shared/lib";
import styles from "./dashboard-page.module.css";
import {
  calculateProgressPercentage,
  isValue1ExceedingValue2,
} from "@/shared/helpers/calculation";
import { TextField } from "@/shared/ui/text-field/text-field";
import { FilterButton } from "@/features/filter-button";
import { mockAInvestments } from "@/entities/asset/model/mock";
import i18n from "@/shared/i18n";
import {
  investmentStatusIcons,
  investmentStatusIconsColors,
  investmentStatusVariants,
  progressColors,
  statIconColor,
  statIcons,
  statTones,
} from "@/shared/helpers/consts";

export function DashboardPage() {
  const navigate = useNavigate(); // <-- Add this
  const totalCapital = mockAssets.reduce((sum, a) => sum + a.saCapital, 0);
  const totalGain = mockAssets.reduce((sum, a) => sum + a.saGain, 0);
  const { t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  const totalYemeniCapital = mockAssets.reduce(
    (sum, a) => sum + a.yeCapital,
    0,
  );
  const totalYemeniGain = mockAssets.reduce((sum, a) => sum + a.yeGain, 0);

  const valueTone = statTones[isValue1ExceedingValue2(totalGain, totalCapital)];
  const yeValueTone =
    statTones[isValue1ExceedingValue2(totalYemeniGain, totalYemeniCapital)];

  const statIcon = statIcons[isValue1ExceedingValue2(totalGain, totalCapital)];
  const yeStatIcon =
    statIcons[isValue1ExceedingValue2(totalYemeniGain, totalYemeniCapital)];

  const iconColor =
    statIconColor[isValue1ExceedingValue2(totalGain, totalCapital)];
  const yeIconColor =
    statIconColor[isValue1ExceedingValue2(totalYemeniGain, totalYemeniCapital)];

  const onFilterInvestment = () => {
    // Filter Investment
  };

  return (
    <div className={styles.page}>
      <section className={styles.stats}>
        <StatCard
          label={t("dashboard.total_capital_sa")}
          value={formatCurrency(totalCapital)}
          icon={saudiRialIcon}
        />
        <StatCard
          label={t("dashboard.total_gained_sa")}
          value={formatCurrency(totalGain)}
          tone={valueTone}
          icon={statIcon}
          iconColor={iconColor}
        />
        <StatCard
          label={t("dashboard.total_capital_ye")}
          value={formatCurrency(totalYemeniCapital, "YER")}
          icon={yemeniRialIcon}
        />
        <StatCard
          label={t("dashboard.total_gained_ye")}
          value={formatCurrency(totalYemeniGain, "YER")}
          tone={yeValueTone}
          icon={yeStatIcon}
          iconColor={yeIconColor}
        />
      </section>
      <section className={styles.active_investments}>
        <div className={styles.active_investments_header}>
          <TextField leading={t("common.search")} placeholder="" />
          <FilterButton onClick={onFilterInvestment} />
        </div>
        <section className={styles.active_investments_list}>
          {mockAInvestments.map((invest) => {
            const investName =
              current === "en" ? invest.name_en : invest.name_ar;
            const statusI18n = t(`investment.${invest.status}`);
            const progressColorYer =
              progressColors[
                isValue1ExceedingValue2(
                  invest.total_gained_ye,
                  invest.total_capital_ye,
                )
              ];
            const progressColorSar =
              progressColors[
                isValue1ExceedingValue2(
                  invest.total_gained_sa,
                  invest.total_capital_sa,
                )
              ];
            const progressSarAvg = calculateProgressPercentage(
              invest.total_capital_sa,
              invest.total_gained_sa,
            );
            const progressYerAvg = calculateProgressPercentage(
              invest.total_capital_ye,
              invest.total_gained_ye,
            );

            const roi =
              invest.total_capital_sa > 0
                ? (invest.total_gained_sa / invest.total_capital_sa) * 100
                : 0;

            return (
              <Card
                key={invest.id}
                className={styles.investCard}
                onClick={() => navigate(`/dashboard/${invest.id}`)}
              >
                {/* Header Area */}
                <div className={styles.investHeader}>
                  <div className={styles.investTitleArea}>
                    <h3 className={styles.investName}>{investName}</h3>
                    <Badge
                      label={statusI18n}
                      variant={investmentStatusVariants[invest.status]}
                      icon={
                        <SVG
                          src={investmentStatusIcons[invest.status]}
                          alt={statusI18n}
                          fill={investmentStatusIconsColors[invest.status]}
                        />
                      }
                    />
                  </div>
                  <div className={styles.investRoi}>
                    <strong className={styles.roiValue}>
                      {formatPercent(roi)}
                    </strong>
                    <small className={styles.roiLabel}>
                      {t("investment.roi")}
                    </small>
                  </div>
                </div>
                {/* Divider */}
                <hr className={styles.investDivider} />
                {/* Body Area */}
                <div className={styles.investBody}>
                  <div className={styles.investColumns}>
                    <span className={styles.columnLabel}>
                      {t("investment.total_invested")}
                    </span>
                    <span className={styles.columnLabel}>
                      {t("investment.total_returned")}
                    </span>
                  </div>
                  {/* Saudi Riyal Progress */}
                  <ProgressBar
                    value={progressSarAvg}
                    progressColor={
                      invest.status === "inactive" ? "muted" : progressColorSar
                    }
                    leftLabel={formatCurrency(invest.total_capital_sa)}
                    rightLabel={formatCurrency(invest.total_gained_sa)}
                    centerLabel={formatPercent(progressSarAvg, "never")}
                    labelColor={
                      invest.status === "inactive" ? "muted" : progressColorSar
                    }
                  />
                  {/* Yemeni Rial Progress */}
                  <ProgressBar
                    value={progressYerAvg}
                    progressColor={
                      invest.status === "inactive" ? "muted" : progressColorYer
                    }
                    leftLabel={formatCurrency(invest.total_capital_ye, "YER")}
                    rightLabel={formatCurrency(invest.total_gained_ye, "YER")}
                    centerLabel={formatPercent(progressYerAvg, "never")}
                    labelColor={
                      invest.status === "inactive" ? "muted" : progressColorYer
                    }
                  />
                </div>
              </Card>
            );
          })}
        </section>
      </section>
    </div>
  );
}
