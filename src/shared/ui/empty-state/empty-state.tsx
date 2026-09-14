import type { ReactNode } from "react";
import { SVG } from "@/shared/ui/svg/svg";
import styles from "./empty-state.module.css";

export interface EmptyStateProps {
  icon: string;
  message: string;
  action?: ReactNode;
}

export function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className={styles.root} role="status">
      <SVG src={icon} className={styles.icon} alt="" />
      <p className={styles.message}>{message}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
