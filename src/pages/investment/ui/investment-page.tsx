import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OverviewCard } from "./components/investment-overview";
import styles from "./investment-page.module.css";
import { Button, Tabs } from "@/shared/ui";
import { useInvestmentTabs } from "@/shared/helpers/consts";
import { InvestmentOverviewPage } from "./tabs/investment-overview-page";
import { InvestmentCapitalPage } from "./tabs/investment-capital-page";
import { InvestmentReturnsPage } from "./tabs/investment-returns-page";
import type { InvestmentLoaderData } from "@/pages/investment/model/investment-loader";

export function InvestmentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const investmentTabs = useInvestmentTabs();
  const { t } = useTranslation();
  const { investment, capitals, returns, overviewStats, error } =
    useLoaderData<InvestmentLoaderData>();
  const revalidator = useRevalidator();
  const isLoading = revalidator.state === "loading";

  const refreshInvestment = () => {
    void revalidator.revalidate();
  };

  if (isLoading && !investment) {
    return <div className={styles.error}>{t("common.loading")}</div>;
  }

  if (error && !investment) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
        <Button variant="secondary-soft" size="sm" onClick={refreshInvestment}>
          {t("common.retry")}
        </Button>
      </div>
    );
  }

  if (!investment) {
    return <div className={styles.error}>{t("common.not_found")}</div>;
  }

  return (
    <div className={styles.page}>
      <OverviewCard
        invest={investment}
        investment={investment}
        investmentId={investment.id}
        onSuccess={refreshInvestment}
      />
      <Tabs
        tabs={investmentTabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
      <div className={styles.tabsContainer}>
        {activeTab === "overview" && (
          <InvestmentOverviewPage overviewStats={overviewStats} />
        )}
        {activeTab === "capitals" && (
          <InvestmentCapitalPage
            investmentId={investment.id}
            investment={investment}
            capitals={capitals}
            onSuccess={refreshInvestment}
          />
        )}
        {activeTab === "returns" && (
          <InvestmentReturnsPage
            investmentId={investment.id}
            investment={investment}
            returns={returns}
            onSuccess={refreshInvestment}
          />
        )}
      </div>
    </div>
  );
}
