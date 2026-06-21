import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { TextField } from "../text-field/text-field";

export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: ReactNode;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    return <TextField ref={ref} type="date" {...props} />;
  },
);

DatePicker.displayName = "DatePicker";
