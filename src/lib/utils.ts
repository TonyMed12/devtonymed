import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges class names; a caller-supplied className overrides the defaults.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
