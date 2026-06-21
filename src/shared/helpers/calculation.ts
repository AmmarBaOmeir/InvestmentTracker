export const isValue1ExceedingValue2 = (value1: number, value2: number) => {
  const isBigger = value1 > value2;
  const isEqual = value1 === value2;

  if (isBigger) return 1;
  else if (isEqual) return 0;
  else return -1;
};

export function calculateProgressPercentage(
  target: number,
  current: number,
): number {
  if (target <= 0 || current <= 0) return 0;

  const percentage = (current / target) * 100;

  // Remove Math.min to allow values over 100%
  return Number(percentage.toFixed(2));
}
