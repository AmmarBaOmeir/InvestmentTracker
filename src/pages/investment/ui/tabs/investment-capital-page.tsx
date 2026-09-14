import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AddCapitalForm } from "../forms/add-capital-form";
import { Button, EmptyState, Table } from "@/shared/ui";
import { SVG } from "@/shared/ui/svg/svg";
import plusIcon from "@/assets/icons/plus.svg";
import walletIcon from "@/assets/icons/wallet.svg";
import type { CapitalData, Investment } from "@/entities/asset/model/types";
import { useCapitalColumns } from "@/shared/helpers/consts";

import styles from "../investment-page.module.css";
import sharedStyles from "@/shared/helpers/const.module.css";
interface InvestmentCapitalPageProps {
  investmentId: string;
  investment: Investment;
  capitals: CapitalData[];
  onSuccess?: () => void;
}
export function InvestmentCapitalPage({
  investmentId,
  investment,
  capitals,
  onSuccess,
}: InvestmentCapitalPageProps) {
  const capitalColumns = useCapitalColumns();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const addCapitalButton = (
    <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
      <SVG
        src={plusIcon}
        fill="var(--surface)"
        alt={t("investment.add_capital")}
      />
      {t("investment.add_capital")}
    </Button>
  );

  return (
    <div className={styles.page}>
      {capitals.length === 0 ? (
        <EmptyState
          icon={walletIcon}
          message={t("investment.no_capitals")}
          action={addCapitalButton}
        />
      ) : (
        <Table<CapitalData>
          data={capitals}
          columns={capitalColumns}
          keyExtractor={(item) => item.id}
          bodyCss={styles.tableBody}
          footer={
            <div className={styles.footer}>
              <span className={sharedStyles.mutedText}>
                {capitals.length} {t("common.record")}
              </span>
              {addCapitalButton}
              <span />
            </div>
          }
        />
      )}
      <AddCapitalForm
        investment={investment}
        investmentId={investmentId}
        onSuccess={onSuccess}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
