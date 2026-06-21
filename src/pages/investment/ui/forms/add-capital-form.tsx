import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, SVG } from "@/shared/ui";
import walletIcon from "@/assets/icons/wallet.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import styles from "./forms.module.css";

interface AddCapitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCapitalForm = ({ isOpen, onClose }: AddCapitalModalProps) => {
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
          <SVG src={walletIcon} size={24} />
          {t("investment.add_capital")}
        </>
      }
      footer={
        <>
          <Button type="button" variant="secondary-soft" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" variant="primary" form="add-capital-form">
            {t("common.save")}
          </Button>
        </>
      }
    >
      <p className={styles.description}>
        {t(
          "investment.add_capital_desc",
          "Please fill in the details below to add new capital.",
        )}
      </p>
      <form
        id="add-capital-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <TextField
          label={t("common.title")}
          name="title"
          required
          placeholder={t("common.title")}
        />

        <Textarea
          label={t("common.description")}
          name="description"
          placeholder={t("common.description")}
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
      </form>
    </Modal>
  );
};
