import type { ReactNode } from "react";
import { cn } from "@/shared/lib";
import styles from "./tabs.module.css";

export interface TabItem {
  id: string;
  label: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId, onChange, className }: TabsProps) {
  return (
    <div className={cn(styles.tabsContainer, className)}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              className={cn(styles.tabItem, isActive && styles.active)}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
