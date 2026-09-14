import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "@/shared/config";
import { login } from "@/shared/lib/auth-api";
import { Button, TextField } from "@/shared/ui";
import styles from "./login-page.module.css";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = login(username, password);

    if (!result.ok) {
      setError(t("login.invalid_credentials"));
      setIsSubmitting(false);
      return;
    }

    navigate(paths.dashboard, { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t("login.title")}</h1>
        <p className={styles.subtitle}>{t("login.subtitle")}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="username"
            autoComplete="username"
            label={t("login.username")}
            placeholder={t("login.username_placeholder")}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <TextField
            type="password"
            name="password"
            autoComplete="current-password"
            label={t("login.password")}
            placeholder={t("login.password_placeholder")}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("login.submitting") : t("login.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
