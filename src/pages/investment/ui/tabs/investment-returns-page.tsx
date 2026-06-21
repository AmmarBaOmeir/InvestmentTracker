import { useTranslation } from "react-i18next";
import { Button, Table, TextField } from "@/shared/ui";
import { SVG } from "@/shared/ui/svg/svg";
import plusIcon from "@/assets/icons/plus.svg";

import type { ReturnData } from "@/entities/asset/model/types";
import { mockReturns } from "@/entities/asset/model/mock";
import { useReturnColumns } from "@/shared/helpers/consts";

import styles from "../investment-page.module.css";
import sharedStyles from "@/shared/helpers/const.module.css";
import { cn } from "@/shared/lib";
import { FilterButton } from "@/features/filter-button";

export function InvestmentReturnsPage() {
  const returnColumns = useReturnColumns();
  const { t } = useTranslation();

  const onFilterClick = () => {};

  return (
    <div className={styles.page}>
      <Table<ReturnData>
        data={mockReturns}
        columns={returnColumns}
        keyExtractor={(_, index) => index}
        bodyCss={cn(styles.tableBody, styles.returnsTableBody)}
        header={{
          search: (
            <div className={styles.header}>
              <TextField leading={t("common.search")} placeholder="" />
              <FilterButton onClick={onFilterClick} />
            </div>
          ),
        }}
        footer={
          <div className={styles.footer}>
            <span className={sharedStyles.mutedText}>
              {mockReturns?.length || 0} {t("common.record")}
            </span>
            <Button variant="primary" size="sm">
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
    </div>
  );
}
