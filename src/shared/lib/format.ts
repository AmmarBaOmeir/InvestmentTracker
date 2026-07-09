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

export function formatDisplayDate(
  value: string | Date,
  locale = "en-US",
): string {
  const date =
    typeof value === "string"
      ? new Date(value.includes("T") ? value : `${value}T00:00:00`)
      : value;

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
