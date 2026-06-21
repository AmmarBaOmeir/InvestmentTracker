export const formatCurrency = (value: number, currency = "SAR"): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

export const formatPercent = (
  value: number,
  signDisplay: "always" | "never" = "always",
): string =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay,
  }).format(value / 100);
