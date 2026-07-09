import { SVG } from "@/shared/ui";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import saudiRialIcon from "@/assets/icons/saudi-rial.svg";
import searchIcon from "@/assets/icons/search.svg";
import yemeniRialIcon from "@/assets/icons/yemeni-rial.svg";
import { Badge, Card, ProgressBar, StatCard } from "@/shared/ui";
import { formatCurrency, formatPercent } from "@/shared/lib";
import styles from "./dashboard-page.module.css";
import { Button } from "@/shared/ui";
import plusIcon from "@/assets/icons/plus.svg";
import { AddInvestmentForm } from "../../investment/ui/forms/add-investment-form";
import { FilterInvestmentModal } from "./forms/filter-investment-modal";
import {
  calculateProgressPercentage,
  isValue1ExceedingValue2,
} from "@/shared/helpers/calculation";
import { TextField } from "@/shared/ui/text-field/text-field";
import { FilterButton } from "@/features/filter-button";
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
import type { DashboardLoaderData } from "../model/dashboard-loader";
import {
  EMPTY_INVESTMENT_FILTERS,
  filterInvestments,
  hasActiveInvestmentFilters,
} from "../model/investment-filters";

export function DashboardPage() {
  const navigate = useNavigate();
  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [investmentFilters, setInvestmentFilters] = useState(
    EMPTY_INVESTMENT_FILTERS,
  );
  const {
    investments,
    statistics,
    error: loadError,
  } = useLoaderData<DashboardLoaderData>();
  const revalidator = useRevalidator();
  const isLoadingInvestments = revalidator.state === "loading";

  const { t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  const filteredInvestments = useMemo(
    () => filterInvestments(investments, searchQuery, investmentFilters),
    [investments, searchQuery, investmentFilters],
  );

  const isFilterApplied = hasActiveInvestmentFilters(investmentFilters);

  const loadInvestments = () => {
    void revalidator.revalidate();
  };

  const {
    total_capital_sa: totalCapital,
    total_gained_sa: totalGain,
    total_capital_ye: totalYemeniCapital,
    total_gained_ye: totalYemeniGain,
  } = statistics;

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
    setIsFilterModalOpen(true);
  };

  const onAddInvestment = () => {
    setIsAddInvestmentModalOpen(true);
  };

  const resetInvestmentFilters = () => {
    setInvestmentFilters(EMPTY_INVESTMENT_FILTERS);
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
          <div className={styles.active_investments_header_filter}>
            <TextField
              leading={<SVG src={searchIcon} />}
              placeholder={t("common.search_placeholder")}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <FilterButton
              onClick={onFilterInvestment}
              hasFilter={isFilterApplied}
              onClear={resetInvestmentFilters}
            />
          </div>
          <Button variant="primary" size="sm" onClick={onAddInvestment}>
            <SVG
              src={plusIcon}
              alt={t("dashboard.add_investment")}
              fill="var(--surface)"
            />
            {t("dashboard.add_investment")}
          </Button>
        </div>
        <section className={styles.active_investments_list}>
          {isLoadingInvestments ? (
            <p className={styles.listMessage}>{t("common.loading")}</p>
          ) : loadError ? (
            <div className={styles.listError} role="alert">
              <p>{loadError}</p>
              <div className={styles.listErrorActions}>
                <Button
                  variant="secondary-soft"
                  size="sm"
                  onClick={() => void loadInvestments()}
                >
                  {t("common.retry")}
                </Button>
              </div>
            </div>
          ) : investments.length === 0 ? (
            <p className={styles.listMessage}>
              {t("dashboard.no_investments")}
            </p>
          ) : filteredInvestments.length === 0 ? (
            <p className={styles.listMessage}>{t("dashboard.no_results")}</p>
          ) : null}
          {filteredInvestments.map((invest) => {
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
                    centerLabel={formatPercent(progressSarAvg)}
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
                    centerLabel={formatPercent(progressYerAvg)}
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
      <AddInvestmentForm
        isOpen={isAddInvestmentModalOpen}
        onClose={() => setIsAddInvestmentModalOpen(false)}
        onSuccess={loadInvestments}
      />
      <FilterInvestmentModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={investmentFilters}
        onApply={setInvestmentFilters}
        onReset={resetInvestmentFilters}
      />
    </div>
  );
}
