import { AUTH_CREDENTIALS } from "@/shared/config/auth";

export const AUTH_TOKEN_KEY = "auth_token";

export type AuthSession = {
  token: string;
  createdAt: number;
};

export type AuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
};

function createToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...bytes));
}

export function validateCredentials(
  username: string,
  password: string,
): boolean {
  return (
    username === AUTH_CREDENTIALS.username &&
    password === AUTH_CREDENTIALS.password
  );
}

export function createSession(): AuthSession {
  const session: AuthSession = {
    token: createToken(),
    createdAt: Date.now(),
  };
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    return parsed?.token ? parsed : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getAuthUser(): AuthUser {
  return {
    id: "local-user",
    username: AUTH_CREDENTIALS.username,
    name: "Admin",
    email: "admin@local",
  };
}
