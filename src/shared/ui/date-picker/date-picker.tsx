import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import { TextField } from "../text-field/text-field";
import styles from "./date-picker.module.css";

export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: ReactNode;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, ...props }, ref) => {
    const field = (
      <div className={cn(styles.wrapper, className)}>
        <TextField ref={ref} type="date" className={styles.field} {...props} />
      </div>
    );

    if (label) {
      return (
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          {field}
        </div>
      );
    }

    return field;
  },
);

DatePicker.displayName = "DatePicker";
