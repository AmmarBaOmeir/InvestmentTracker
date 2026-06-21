import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, SVG } from "@/shared/ui";
import investmentIcon from "@/assets/icons/investment.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import { Select } from "@/shared/ui/select/select";
import styles from "./forms.module.css";

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddInvestmentForm({
  isOpen,
  onClose,
}: AddInvestmentModalProps) {
  const { t } = useTranslation();

  const [totalShares, setTotalShares] = useState<number | "">("");
  const [amountSarPerShare, setAmountSarPerShare] = useState<number | "">("");
  const [amountYerPerShare, setAmountYerPerShare] = useState<number | "">("");

  const amountSar =
    (Number(totalShares) || 0) * (Number(amountSarPerShare) || 0);
  const amountYer =
    (Number(totalShares) || 0) * (Number(amountYerPerShare) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <SVG src={investmentIcon} size={24} />
          {t("investment.add_investment")}
        </>
      }
      footer={
        <>
          <Button type="button" variant="secondary-soft" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" variant="primary" form="add-investment-form">
            {t("common.save")}
          </Button>
        </>
      }
    >
      <p className={styles.description}>
        {t(
          "investment.add_investment_desc",
          "Please fill in the details below to add a new investment.",
        )}
      </p>
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
        />

        <TextField
          label={t("common.name_ar")}
          name="name_ar"
          required
          placeholder={t("common.name_ar")}
        />

        <Textarea
          label={t("common.description_en")}
          name="description_en"
          placeholder={t("common.description_en")}
        />

        <Textarea
          label={t("common.description_ar")}
          name="description_ar"
          placeholder={t("common.description_ar")}
        />

        <DatePicker
          label={t("investment.date_of_funding")}
          name="date"
          required
        />

        <TextField
          label={t("investment.total_shares")}
          name="total_shares"
          type="number"
          step="any"
          required
          placeholder="0"
          value={totalShares}
          onChange={(e) =>
            setTotalShares(e.target.value ? Number(e.target.value) : "")
          }
        />

        <TextField
          label={t("investment.amount_sar_per_share")}
          name="amount_sar_per_share"
          type="number"
          step="any"
          required
          placeholder="0.00"
          value={amountSarPerShare}
          onChange={(e) =>
            setAmountSarPerShare(e.target.value ? Number(e.target.value) : "")
          }
        />

        <TextField
          label={t("investment.amount_yer_per_share")}
          name="amount_yer_per_share"
          type="number"
          step="any"
          required
          placeholder="0.00"
          value={amountYerPerShare}
          onChange={(e) =>
            setAmountYerPerShare(e.target.value ? Number(e.target.value) : "")
          }
        />

        <TextField
          label={t("investment.amount_sar")}
          name="amount_sar"
          type="number"
          step="any"
          readOnly
          value={amountSar || ""}
          placeholder="0.00"
        />

        <TextField
          label={t("investment.amount_yer")}
          name="amount_yer"
          type="number"
          step="any"
          readOnly
          value={amountYer || ""}
          placeholder="0.00"
        />

        <Select label={t("investment.return_type")} name="return_type" required>
          <option value="yearly">{t("common.yearly")}</option>
          <option value="quarterly">{t("common.quarterly")}</option>
          <option value="monthly">{t("common.monthly")}</option>
          <option value="daily">{t("common.daily")}</option>
        </Select>

        <TextField
          label={t("investment.expected_return_amount")}
          name="expected_return_amount"
          type="number"
          step="any"
          required
          placeholder="0.00"
        />
      </form>
    </Modal>
  );
}
