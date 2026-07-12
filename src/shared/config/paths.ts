export const paths = {
  dashboard: "/dashboard",
  investment: (id: number | string) => `/dashboard/${id}`,
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
