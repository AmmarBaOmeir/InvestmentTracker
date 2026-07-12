import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Modal, SVG } from "@/shared/ui";
import investmentIcon from "@/assets/icons/investment.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import { Select } from "@/shared/ui/select/select";
import {
  buildCreateInvestmentPayload,
  createInvestment,
} from "@/entities/asset/api/investments";
import { cn, resolveRequestError } from "@/shared/lib";
import styles from "./forms.module.css";

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddInvestmentForm({
  isOpen,
  onClose,
  onSuccess,
}: AddInvestmentModalProps) {
  const { t } = useTranslation();

  const [includeInitialCapital, setIncludeInitialCapital] = useState(true);
  const [totalShares, setTotalShares] = useState<number | "">("");
  const [amountSarPerShare, setAmountSarPerShare] = useState<number | "">("");
  const [amountYerPerShare, setAmountYerPerShare] = useState<number | "">("");
  const [expectedReturnSarPerShare, setExpectedReturnSarPerShare] = useState<
    number | ""
  >("");
  const [expectedReturnYerPerShare, setExpectedReturnYerPerShare] = useState<
    number | ""
  >("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const amountSar =
    (Number(totalShares) || 0) * (Number(amountSarPerShare) || 0);
  const amountYer =
    (Number(totalShares) || 0) * (Number(amountYerPerShare) || 0);

  const resetForm = () => {
    setIncludeInitialCapital(true);
    setTotalShares("");
    setAmountSarPerShare("");
    setAmountYerPerShare("");
    setExpectedReturnSarPerShare("");
    setExpectedReturnYerPerShare("");
    setErrorMessage(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const payload = buildCreateInvestmentPayload(formData, {
        amountSar,
        amountYer,
        includeInitialCapital,
      });
      await createInvestment(payload);
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      setErrorMessage(resolveRequestError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <>
          <SVG src={investmentIcon} size={24} />
          {t("investment.add_investment")}
        </>
      }
      footer={
        <>
          <Button
            type="button"
            variant="secondary-soft"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            form="add-investment-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("common.saving") : t("common.save")}
          </Button>
        </>
      }
    >
      <p className={styles.description}>
        {t("investment.add_investment_desc")}
      </p>
      {errorMessage ? (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
      <form
        id="add-investment-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <TextField
          label={t("common.name_en")}
          name="name_en"
          required
          placeholder={t("common.name_en")}
          disabled={isSubmitting}
        />

        <TextField
          label={t("common.name_ar")}
          name="name_ar"
          required
          placeholder={t("common.name_ar")}
          disabled={isSubmitting}
        />

        <Textarea
          label={t("common.description_en")}
          name="description_en"
          placeholder={t("common.description_en")}
          disabled={isSubmitting}
        />

        <Textarea
          label={t("common.description_ar")}
          name="description_ar"
          placeholder={t("common.description_ar")}
          disabled={isSubmitting}
        />

        <DatePicker
          label={t("investment.date_of_funding")}
          name="date"
          required
          disabled={isSubmitting}
        />

        <div className={styles.checkboxRow}>
          <Checkbox
            id="include-initial-capital"
            checked={includeInitialCapital}
            onChange={(event) => setIncludeInitialCapital(event.target.checked)}
            disabled={isSubmitting}
            title={t("investment.include_initial_capital")}
            hint={t("investment.include_initial_capital_desc")}
            labelClassName={styles.checkboxLabel}
          />
        </div>

        <div
          className={cn(
            styles.capitalFieldsShell,
            !includeInitialCapital && styles.capitalFieldsCollapsed,
          )}
          aria-hidden={!includeInitialCapital}
        >
          <div className={styles.capitalFields}>
            <TextField
              label={t("investment.total_shares")}
              name="total_shares"
              type="number"
              step="any"
              required={includeInitialCapital}
              placeholder="0"
              value={totalShares}
              onChange={(e) =>
                setTotalShares(e.target.value ? Number(e.target.value) : "")
              }
              disabled={isSubmitting || !includeInitialCapital}
            />

            <TextField
              label={t("investment.capital_amount_per_share_sar")}
              name="amount_sar_per_share"
              type="number"
              step="any"
              required={includeInitialCapital}
              placeholder="0.00"
              value={amountSarPerShare}
              onChange={(e) =>
                setAmountSarPerShare(
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              disabled={isSubmitting || !includeInitialCapital}
            />

            <TextField
              label={t("investment.capital_amount_per_share_yer")}
              name="amount_yer_per_share"
              type="number"
              step="any"
              required={includeInitialCapital}
              placeholder="0.00"
              value={amountYerPerShare}
              onChange={(e) =>
                setAmountYerPerShare(
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              disabled={isSubmitting || !includeInitialCapital}
            />

            <TextField
              label={t("investment.amount_sar")}
              name="amount_sar"
              type="number"
              step="any"
              readOnly
              value={amountSar || ""}
              placeholder="0.00"
              disabled={!includeInitialCapital}
            />

            <TextField
              label={t("investment.amount_yer")}
              name="amount_yer"
              type="number"
              step="any"
              readOnly
              value={amountYer || ""}
              placeholder="0.00"
              disabled={!includeInitialCapital}
            />
          </div>
        </div>

        <Select
          label={t("investment.return_type")}
          name="return_type"
          required
          disabled={isSubmitting}
        >
          <option value="yearly">{t("common.yearly")}</option>
          <option value="quarterly">{t("common.quarterly")}</option>
          <option value="monthly">{t("common.monthly")}</option>
          <option value="daily">{t("common.daily")}</option>
        </Select>

        <TextField
          label={t("investment.expected_return_amount_per_share_sar")}
          name="expected_return_amount_per_share_sar"
          type="number"
          step="any"
          required
          placeholder="0.00"
          value={expectedReturnSarPerShare}
          onChange={(e) =>
            setExpectedReturnSarPerShare(
              e.target.value ? Number(e.target.value) : "",
            )
          }
          disabled={isSubmitting}
        />

        <TextField
          label={t("investment.expected_return_amount_per_share_yer")}
          name="expected_return_amount_per_share_yer"
          type="number"
          step="any"
          required
          placeholder="0.00"
          value={expectedReturnYerPerShare}
          onChange={(e) =>
            setExpectedReturnYerPerShare(
              e.target.value ? Number(e.target.value) : "",
            )
          }
          disabled={isSubmitting}
        />
      </form>
    </Modal>
  );
}
