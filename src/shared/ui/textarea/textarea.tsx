import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./textarea.module.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    const textareaContent = (
      <textarea
        ref={ref}
        className={cn(styles.textarea, className)}
        {...props}
      />
    );

    if (label) {
      return (
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          {textareaContent}
        </div>
      );
    }

    return textareaContent;
  },
);

Textarea.displayName = "Textarea";
