import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { mockAInvestments } from "@/entities/asset/model/mock";
import { OverviewCard } from "./components/investment-overview";
import styles from "./investment-page.module.css";
import { Tabs } from "@/shared/ui";
import { useInvestmentTabs } from "@/shared/helpers/consts";
import { InvestmentOverviewPage } from "./tabs/investment-overview-page";
import { InvestmentCapitalPage } from "./tabs/investment-capital-page";
import { InvestmentReturnsPage } from "./tabs/investment-returns-page";

export function InvestmentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const investmentTabs = useInvestmentTabs();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const invest = mockAInvestments.find((item) => item.id === id);

  if (!invest) {
    return <div className={styles.error}>{t("common.not_found")}</div>;
  }

  return (
    <div className={styles.page}>
      <OverviewCard invest={invest} />
      <Tabs
        tabs={investmentTabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ padding: "4px 0" }}>
        {activeTab === "overview" && <InvestmentOverviewPage />}
        {activeTab === "capitals" && <InvestmentCapitalPage />}
        {activeTab === "returns" && <InvestmentReturnsPage />}
      </div>
    </div>
  );
}
