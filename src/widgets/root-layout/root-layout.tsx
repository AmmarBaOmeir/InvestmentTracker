import { Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { AppHeader } from "@/widgets/app-header";
import { PageFallback } from "@/shared/ui";
import { cn } from "@/shared/lib";
import styles from "./root-layout.module.css";

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <div className={styles.main}>
      <AppHeader />
      <main
        className={cn(styles.content, isNavigating && styles.contentNavigating)}
      >
        {isNavigating && (
          <div className={styles.navOverlay} aria-hidden="true">
            <PageFallback />
          </div>
        )}
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
