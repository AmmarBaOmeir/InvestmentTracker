import { redirect } from "react-router-dom";
import { paths } from "@/shared/config";
import { getAuthUser, isAuthenticated } from "@/shared/lib/auth-storage";
import type { AuthLoaderData } from "./auth-guard";

export function requireAuthLoader(): AuthLoaderData {
  if (!isAuthenticated()) {
    throw redirect(paths.login);
  }

  return { user: getAuthUser() };
}

export function loginLoader(): null {
  if (isAuthenticated()) {
    throw redirect(paths.dashboard);
  }

  return null;
}
