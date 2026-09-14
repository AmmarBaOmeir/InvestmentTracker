import {
  clearSession,
  createSession,
  getAuthUser,
  isAuthenticated,
  validateCredentials,
  type AuthUser,
} from "@/shared/lib/auth-storage";

export type { AuthUser };

export type LoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: "invalid_credentials" };

export function login(username: string, password: string): LoginResult {
  if (!validateCredentials(username, password)) {
    return { ok: false, error: "invalid_credentials" };
  }

  createSession();
  return { ok: true, user: getAuthUser() };
}

export function logout(): void {
  clearSession();
}

export function checkAuth(): boolean {
  return isAuthenticated();
}

export function getMe(): AuthUser {
  if (!isAuthenticated()) {
    throw new Error("UNAUTHORIZED");
  }

  return getAuthUser();
}
