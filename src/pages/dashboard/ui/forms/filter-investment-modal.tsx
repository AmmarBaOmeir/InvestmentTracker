import { useTranslation } from "react-i18next";
import { Button, Modal, SVG } from "@/shared/ui";
import filterIcon from "@/assets/icons/filter.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Select } from "@/shared/ui/select/select";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import styles from "./filter-investment-modal.module.css";
import {
  parseInvestmentFilters,
  type InvestmentFilters,
} from "../../model/investment-filters";

interface FilterInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: InvestmentFilters;
  onApply: (filters: InvestmentFilters) => void;
  onReset: () => void;
}

export function FilterInvestmentModal({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}: FilterInvestmentModalProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onApply(parseInvestmentFilters(formData));
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <SVG
            src={filterIcon}
            fill="var(--text-muted)"
            size={14}
            alt={t("common.filter")}
          />
          {t("investment.filter_investments")}
        </>
      }
      footer={
        <>
          <Button type="button" variant="secondary-soft" onClick={handleReset}>
            {t("common.reset")}
          </Button>
          <Button type="submit" variant="primary" form="filter-investment-form">
            {t("common.apply")}
          </Button>
        </>
      }
    >
      <form
        key={JSON.stringify(filters)}
        id="filter-investment-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Select
          label={t("investment.status")}
          name="status"
          defaultValue={filters.status}
        >
          <option value="">{t("common.all")}</option>
          <option value="profitable">{t("investment.profitable")}</option>
          <option value="match_capital">{t("investment.match_capital")}</option>
          <option value="in_progress">{t("investment.in_progress")}</option>
          <option value="inactive">{t("investment.inactive")}</option>
        </Select>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_capital")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="capital_min"
              placeholder={t("common.min")}
              defaultValue={filters.capitalMin ?? ""}
            />
            <TextField
              type="number"
              name="capital_max"
              placeholder={t("common.max")}
              defaultValue={filters.capitalMax ?? ""}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_returned")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="returned_min"
              placeholder={t("common.min")}
              defaultValue={filters.returnedMin ?? ""}
            />
            <TextField
              type="number"
              name="returned_max"
              placeholder={t("common.max")}
              defaultValue={filters.returnedMax ?? ""}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_shares")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="shares_min"
              placeholder={t("common.min")}
              defaultValue={filters.sharesMin ?? ""}
            />
            <TextField
              type="number"
              name="shares_max"
              placeholder={t("common.max")}
              defaultValue={filters.sharesMax ?? ""}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>{t("investment.date")}</label>
          <div className={styles.rangeInputs}>
            <DatePicker
              name="date_from"
              placeholder={t("common.from")}
              defaultValue={filters.dateFrom}
            />
            <DatePicker
              name="date_to"
              placeholder={t("common.to")}
              defaultValue={filters.dateTo}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
