import { Outlet, useLoaderData } from "react-router-dom";
import type { AuthUser } from "@/shared/lib/auth-api";

export interface AuthLoaderData {
  user: AuthUser;
}

export function AuthGuard() {
  const { user } = useLoaderData() as AuthLoaderData;
  return <Outlet context={{ user }} />;
}
