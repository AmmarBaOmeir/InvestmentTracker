import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib";
import styles from "./button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "secondary-soft" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    />
  );
}
