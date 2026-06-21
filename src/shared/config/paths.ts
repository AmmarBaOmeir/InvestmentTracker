export const paths = {
  dashboard: "/dashboard",
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
