import { useState, createElement } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, SVG } from "@/shared/ui";
import increaseIcon from "@/assets/icons/increase.svg";
import { TextField } from "@/shared/ui/text-field/text-field";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import type { Investment } from "@/entities/asset/model/types";
import {
  addReturnToInvestment,
  buildCreateReturnPayload,
} from "@/entities/asset/api/returns";
import { resolveRequestError } from "@/shared/lib";
import styles from "./forms.module.css";

interface AddReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentId: string;
  investment: Investment;
  onSuccess?: () => void;
}

export function AddReturnForm({
  isOpen,
  onClose,
  investmentId,
  investment,
  onSuccess,
}: AddReturnModalProps) {
  const { t } = useTranslation();
  const [totalShares, setTotalShares] = useState<number | "">("");
  const [amountSarPerShare, setAmountSarPerShare] = useState<number | "">("");
  const [amountYerPerShare, setAmountYerPerShare] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const amountSar =
    (Number(totalShares) || 0) * (Number(amountSarPerShare) || 0);
  const amountYer =
    (Number(totalShares) || 0) * (Number(amountYerPerShare) || 0);
  function resetForm() {
    setTotalShares("");
    setAmountSarPerShare("");
    setAmountYerPerShare("");
    setErrorMessage(null);
  }
  function handleClose() {
    if (isSubmitting) return;
    resetForm();
    onClose();
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const fullPayload = buildCreateReturnPayload(formData, investmentId);
      const { investmentId: omittedId, ...payload } = fullPayload;
      void omittedId;
      await addReturnToInvestment(investment, payload);
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      setErrorMessage(resolveRequestError(error));
    } finally {
      setIsSubmitting(false);
    }
  }
  const layoutClassName = styles.form;
  const fields = (
    <>
      <TextField
        label={t("common.name_en")}
        name="title_en"
        required
        placeholder={t("common.name_en")}
        disabled={isSubmitting}
      />
      <TextField
        label={t("common.name_ar")}
        name="title_ar"
        required
        placeholder={t("common.name_ar")}
        disabled={isSubmitting}
      />
      <Textarea
        label={t("investment.note")}
        name="note"
        disabled={isSubmitting}
      />
      <DatePicker
        label={t("investment.date_of_return")}
        name="date"
        required
        disabled={isSubmitting}
      />
      <TextField
        label={t("investment.total_shares")}
        name="total_shares"
        type="number"
        step="any"
        required
        value={totalShares}
        onChange={(e) =>
          setTotalShares(e.target.value ? Number(e.target.value) : "")
        }
        disabled={isSubmitting}
      />
      <TextField
        label={t("investment.amount_sar_per_share")}
        name="amount_sar_per_share"
        type="number"
        step="any"
        required
        value={amountSarPerShare}
        onChange={(e) =>
          setAmountSarPerShare(e.target.value ? Number(e.target.value) : "")
        }
        disabled={isSubmitting}
      />
      <TextField
        label={t("investment.amount_yer_per_share")}
        name="amount_yer_per_share"
        type="number"
        step="any"
        required
        value={amountYerPerShare}
        onChange={(e) =>
          setAmountYerPerShare(e.target.value ? Number(e.target.value) : "")
        }
        disabled={isSubmitting}
      />
      <TextField
        label={t("investment.amount_sar")}
        name="amount_sar"
        type="number"
        readOnly
        value={amountSar || ""}
      />
      <TextField
        label={t("investment.amount_yer")}
        name="amount_yer"
        type="number"
        readOnly
        value={amountYer || ""}
      />
      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary-soft"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {t("common.cancel")}
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? t("common.saving") : t("common.save")}
        </Button>
      </div>
    </>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <>
          <SVG src={increaseIcon} size={24} />
          {t("investment.add_return")}
        </>
      }
      footer={null}
    >
      <p className={styles.description}>{t("investment.add_return_desc")}</p>
      {errorMessage ? (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
      {createElement(
        "form",
        { className: layoutClassName, onSubmit: handleSubmit },
        fields,
      )}
    </Modal>
  );
}
