import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/app-header";
import { PageFallback } from "@/shared/ui";
import styles from "./root-layout.module.css";

export function RootLayout() {
  return (
    <div className={styles.main}>
      <AppHeader />
      <main className={styles.content}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
