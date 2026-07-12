import { cn } from "@/shared/lib";
import styles from "./spinner.module.css";

export function Spinner({ className }: { className?: string }) {
  return <span className={cn(styles.spinner, className)} aria-hidden="true" />;
}
