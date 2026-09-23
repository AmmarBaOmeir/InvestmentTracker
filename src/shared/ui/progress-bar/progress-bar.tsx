import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import {
  getProgressBarFillClass,
  getProgressBarLabelClass,
  getProgressBarTooltip,
  getProgressBarVisualWidth,
  type TextColorVariant,
} from "./progress-bar-variant";
import styles from "./progress-bar.module.css";

export type { TextColorVariant } from "./progress-bar-variant";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  /** Optional override for inactive or custom states. */
  progressColor?: TextColorVariant;
  /** Optional override; defaults to a value-matched label color. */
  labelColor?: TextColorVariant;
  leftLabel?: ReactNode;
  centerLabel?: ReactNode;
  rightLabel?: ReactNode;
}

export function ProgressBar({
  value,
  progressColor,
  labelColor,
  leftLabel,
  centerLabel,
  rightLabel,
  className,
  ...props
}: ProgressBarProps) {
  const visualWidth = getProgressBarVisualWidth(value);
  const fillClass = progressColor
    ? styles[`bg-${progressColor}`]
    : getProgressBarFillClass(value);
  const labelClass = labelColor
    ? styles[`text-${labelColor}`]
    : getProgressBarLabelClass(value);
  const hasLabels = Boolean(leftLabel || centerLabel || rightLabel);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {hasLabels && (
        <div className={cn(styles.labels, labelClass)}>
          <span className={styles.leftLabel}>{leftLabel}</span>
          <span className={styles.centerLabel}>{centerLabel}</span>
          <span className={styles.rightLabel}>{rightLabel}</span>
        </div>
      )}

      <div className={styles.track} title={getProgressBarTooltip(value)}>
        <div
          className={cn(styles.fill, fillClass)}
          style={{ width: `${visualWidth}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={visualWidth}
        />
      </div>
    </div>
  );
}
