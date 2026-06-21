import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => {
    const selectContent = (
      <div className={cn(styles.wrapper, className)}>
        <select ref={ref} className={styles.select} {...props}>
          {children}
        </select>
        <span className={styles.icon}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    );

    if (label) {
      return (
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          {selectContent}
        </div>
      );
    }

    return selectContent;
  },
);

Select.displayName = "Select";
