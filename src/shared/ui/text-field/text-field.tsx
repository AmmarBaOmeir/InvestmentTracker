import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./text-field.module.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
  label?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, leading, label, ...props }, ref) => {
    const inputContent = (
      <div
        className={cn(
          styles.wrapper,
          props.readOnly && styles.readOnly,
          className,
        )}
      >
        {leading && <span className={styles.leading}>{leading}</span>}
        <input ref={ref} className={styles.input} {...props} />
      </div>
    );

    if (label) {
      return (
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          {inputContent}
        </div>
      );
    }

    return inputContent;
  },
);

TextField.displayName = "TextField";
