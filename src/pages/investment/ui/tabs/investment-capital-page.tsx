import { Button, Table } from "@/shared/ui";
import type { CapitalData } from "@/entities/asset/model/types";
import { mockCapitals } from "@/entities/asset/model/mock";
import { useCapitalColumns } from "@/shared/helpers/consts";
import plusIcon from "@/assets/icons/plus.svg";
import styles from "../investment-page.module.css";
import sharedStyles from "@/shared/helpers/const.module.css";
import { useTranslation } from "react-i18next";
import { SVG } from "@/shared/ui/svg/svg";

export function InvestmentCapitalPage() {
  const capitalColumns = useCapitalColumns();
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Table<CapitalData>
        data={mockCapitals}
        columns={capitalColumns}
        keyExtractor={(_, index) => index}
        bodyCss={styles.tableBody}
        footer={
          <div className={styles.footer}>
            <span className={sharedStyles.mutedText}>
              {mockCapitals.length} {t("common.record")}
            </span>
            <Button variant="primary" size="sm">
              <SVG
                src={plusIcon}
                fill="var(--surface)"
                alt={t("investment.add_capital")}
              />
              {t("investment.add_capital")}
            </Button>
            <span />
          </div>
        }
      />
    </div>
  );
}
