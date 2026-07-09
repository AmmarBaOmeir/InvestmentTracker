import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AddReturnForm } from "../forms/add-return-form";
import { Button, Table, TextField } from "@/shared/ui";
import { SVG } from "@/shared/ui/svg/svg";
import plusIcon from "@/assets/icons/plus.svg";
import searchIcon from "@/assets/icons/search.svg";

import type { Investment, ReturnData } from "@/entities/asset/model/types";
import { useReturnColumns } from "@/shared/helpers/consts";

import styles from "../investment-page.module.css";
import sharedStyles from "@/shared/helpers/const.module.css";
import { cn } from "@/shared/lib";

interface InvestmentReturnsPageProps {
  investmentId: string;
  investment: Investment;
  returns: ReturnData[];
  onSuccess?: () => void;
}

export function InvestmentReturnsPage({
  investmentId,
  investment,
  returns,
  onSuccess,
}: InvestmentReturnsPageProps) {
  const returnColumns = useReturnColumns();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReturns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return returns;
    return returns.filter((item) => {
      const haystack = [item.title_en, item.title_ar, item.note ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [returns, searchQuery]);

  return (
    <div className={styles.page}>
      <Table<ReturnData>
        data={filteredReturns}
        columns={returnColumns}
        keyExtractor={(item) => item.id}
        bodyCss={cn(styles.tableBody, styles.returnsTableBody)}
        header={{
          search: (
            <div className={styles.header}>
              <TextField
                leading={<SVG src={searchIcon} />}
                placeholder={t("common.search_placeholder")}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          ),
        }}
        footer={
          <div className={styles.footer}>
            <span className={sharedStyles.mutedText}>
              {filteredReturns.length} {t("common.record")}
            </span>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
              <SVG
                src={plusIcon}
                fill="var(--surface)"
                alt={t("investment.add_return")}
              />
              {t("investment.add_return")}
            </Button>
            <span />
          </div>
        }
      />
      <AddReturnForm
        investment={investment}
        investmentId={investmentId}
        onSuccess={onSuccess}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
