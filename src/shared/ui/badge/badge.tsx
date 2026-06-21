import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./badge.module.css";

export type BadgeVariant =
  | "primary"
  | "success-dark"
  | "success-light"
  | "warning"
  | "error";

export type BadgeAppearance = "soft" | "solid";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  icon?: ReactNode;
}

export function Badge({
  label,
  variant = "primary",
  appearance = "soft",
  icon,
  className,
  ...props
}: BadgeProps) {
  return (
    // We combine the variant class and the appearance class
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[appearance],
        className,
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </span>
  );
}
