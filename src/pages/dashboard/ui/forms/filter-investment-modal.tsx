import { useTranslation } from "react-i18next";
import { Button, Modal, SVG } from "@/shared/ui";
import filterIcon from "@/assets/icons/filter.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Select } from "@/shared/ui/select/select";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import styles from "./filter-investment-modal.module.css";

interface FilterInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  onReset?: () => void;
}

export function FilterInvestmentModal({
  isOpen,
  onClose,
  onApply,
  onReset,
}: FilterInvestmentModalProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Apply filters logic here
    onApply?.();
    onClose();
  };

  const handleReset = () => {
    // Reset filters logic here
    onReset?.();
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
            {t("common.reset", "Reset")}
          </Button>
          <Button type="submit" variant="primary" form="filter-investment-form">
            {t("common.apply", "Apply")}
          </Button>
        </>
      }
    >
      <form
        id="filter-investment-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Select
          label={t("investment.status", "Investment Status")}
          name="status"
        >
          <option value="">{t("common.all", "All")}</option>
          <option value="profitable">
            {t("investment.profitable", "Profitable")}
          </option>
          <option value="match_capital">
            {t("investment.match_capital", "Match Capital")}
          </option>
          <option value="in_progress">
            {t("investment.in_progress", "In Progress")}
          </option>
          <option value="inactive">
            {t("investment.inactive", "Inactive")}
          </option>
        </Select>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_capital", "Total Capital")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="capital_min"
              placeholder={t("common.min", "Min")}
            />
            <TextField
              type="number"
              name="capital_max"
              placeholder={t("common.max", "Max")}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_returned", "Total Returned")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="returned_min"
              placeholder={t("common.min", "Min")}
            />
            <TextField
              type="number"
              name="returned_max"
              placeholder={t("common.max", "Max")}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.total_shares", "Total Shares")}
          </label>
          <div className={styles.rangeInputs}>
            <TextField
              type="number"
              name="shares_min"
              placeholder={t("common.min", "Min")}
            />
            <TextField
              type="number"
              name="shares_max"
              placeholder={t("common.max", "Max")}
            />
          </div>
        </div>

        <div className={styles.rangeGroup}>
          <label className={styles.rangeLabel}>
            {t("investment.date", "Investment Date")}
          </label>
          <div className={styles.rangeInputs}>
            <DatePicker
              name="date_from"
              placeholder={t("common.from", "From")}
            />
            <DatePicker name="date_to" placeholder={t("common.to", "To")} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
