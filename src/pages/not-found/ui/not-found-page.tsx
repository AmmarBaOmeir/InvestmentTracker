import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { paths } from "@/shared/config";

export function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "grid",
        gap: 16,
        marginTop: "10vh",
      }}
    >
      <h1 style={{ fontSize: 64 }}>404</h1>
      <p style={{ color: "var(--text-muted)" }}>
        This page could not be found.
      </p>
      <Link to={paths.dashboard}>
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
