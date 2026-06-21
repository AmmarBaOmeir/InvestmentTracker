import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./progress-bar.module.css";

export type TextColorVariant =
  | "default"
  | "muted"
  | "primary"
  | "success-dark"
  | "success-light"
  | "warning"
  | "error";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  progressColor?: TextColorVariant;
  labelColor?: TextColorVariant;
  leftLabel?: ReactNode;
  centerLabel?: ReactNode;
  rightLabel?: ReactNode;
}

export function ProgressBar({
  value,
  progressColor = "primary",
  labelColor = "default",
  leftLabel,
  centerLabel,
  rightLabel,
  className,
  ...props
}: ProgressBarProps) {
  // Ensure the value stays between 0 and 100
  const visualWidth = Math.min(100, Math.max(0, value));

  const hasLabels = leftLabel || centerLabel || rightLabel;

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {hasLabels && (
        <div className={cn(styles.labels, styles[`text-${labelColor}`])}>
          <span className={styles.leftLabel}>{leftLabel}</span>
          <span className={styles.centerLabel}>{centerLabel}</span>
          <span className={styles.rightLabel}>{rightLabel}</span>
        </div>
      )}

      {/* The progress track (background) */}
      <div className={styles.track}>
        {/* The progress fill */}
        <div
          className={cn(styles.fill, styles[`bg-${progressColor}`])}
          style={{ width: `${visualWidth}%` }}
        />
      </div>
    </div>
  );
}
