import styles from "./page-fallback.module.css";

export function PageFallback() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span>Loading…</span>
    </div>
  );
}
