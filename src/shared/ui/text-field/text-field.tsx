import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./text-field.module.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, leading, ...props }, ref) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        {leading && <span className={styles.leading}>{leading}</span>}
        <input ref={ref} className={styles.input} {...props} />
      </div>
    );
  },
);

TextField.displayName = "TextField";
