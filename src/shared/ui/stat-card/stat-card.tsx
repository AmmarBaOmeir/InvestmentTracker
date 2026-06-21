import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui/card/card";
import styles from "./stat-card.module.css";
import { SVG } from "../svg/svg";

export type StatCardTone = "default" | "positive" | "danger";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  iconColor?: string;
  tone?: StatCardTone;
  delta?: number;
}

export function StatCard({
  label,
  value,
  icon,
  iconColor = "var(--text-muted)",
  tone = "default",
}: StatCardProps) {
  return (
    <Card className={styles.stat}>
      <span className={styles.label}>
        {icon && (
          <SVG className={styles.icon} size={24} src={icon} fill={iconColor} />
        )}
        <span className={styles.labelText}>{label}</span>
      </span>
      <strong className={cn(styles.value, styles[tone])}>{value}</strong>
    </Card>
  );
}
