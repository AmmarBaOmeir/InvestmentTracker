import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./checkbox.module.css";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "title"
> {
  title?: ReactNode;
  hint?: ReactNode;
  labelClassName?: string;
}

export function Checkbox({
  className,
  title,
  hint,
  labelClassName,
  id,
  ...props
}: CheckboxProps) {
  return (
    <label htmlFor={id} className={cn(styles.root, className)}>
      <input id={id} type="checkbox" className={styles.input} {...props} />
      <span className={styles.box} aria-hidden>
        <svg
          className={styles.check}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {(title || hint) && (
        <span className={cn(styles.content, labelClassName)}>
          {title ? <span className={styles.title}>{title}</span> : null}
          {hint ? <span className={styles.hint}>{hint}</span> : null}
        </span>
      )}
    </label>
  );
}
