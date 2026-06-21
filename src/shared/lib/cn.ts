export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) result.push(cn(...input));
    else result.push(String(input));
  }
  return result.join(" ");
}
