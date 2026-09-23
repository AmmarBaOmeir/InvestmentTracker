import styles from "./progress-bar.module.css";

export type TextColorVariant =
  | "default"
  | "muted"
  | "primary"
  | "success-dark"
  | "success-light"
  | "warning"
  | "error";

export const PROGRESS_COLOR_THRESHOLDS = {
  ORANGE: 30,
  YELLOW: 60,
  LIGHT_GREEN: 100,
} as const;

export type ProgressBarValueVariant =
  | "default"
  | "orange"
  | "yellow"
  | "light-green"
  | "over-achievement";

const FILL_CLASS_BY_VARIANT: Record<ProgressBarValueVariant, string> = {
  default: styles["fill-default"],
  orange: styles["fill-orange"],
  yellow: styles["fill-yellow"],
  "light-green": styles["fill-light-green"],
  "over-achievement": styles["fill-over-achievement"],
};

const LABEL_CLASS_BY_VARIANT: Record<ProgressBarValueVariant, string> = {
  default: styles["text-neutral"],
  orange: styles["text-orange"],
  yellow: styles["text-yellow"],
  "light-green": styles["text-light-green"],
  "over-achievement": styles["text-over-achievement"],
};

export function normalizeProgressValue(
  value: number | null | undefined,
): number {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
}

export function getProgressBarValueVariant(
  value: number | null | undefined,
): ProgressBarValueVariant {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "default";
  }

  if (value < PROGRESS_COLOR_THRESHOLDS.ORANGE) return "orange";
  if (value < PROGRESS_COLOR_THRESHOLDS.YELLOW) return "yellow";
  if (value < PROGRESS_COLOR_THRESHOLDS.LIGHT_GREEN) return "light-green";
  return "over-achievement";
}

export function getProgressBarFillClass(
  value: number | null | undefined,
): string {
  return FILL_CLASS_BY_VARIANT[getProgressBarValueVariant(value)];
}

export function getProgressBarLabelClass(
  value: number | null | undefined,
): string {
  return LABEL_CLASS_BY_VARIANT[getProgressBarValueVariant(value)];
}

export function getProgressBarVisualWidth(
  value: number | null | undefined,
): number {
  return Math.min(100, Math.max(0, normalizeProgressValue(value)));
}

export function getProgressBarTooltip(
  value: number | null | undefined,
): string | undefined {
  const normalized = normalizeProgressValue(value);
  return normalized > 100 ? `${normalized}%` : undefined;
}
