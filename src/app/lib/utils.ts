//  twMerge combines tailwind classes into one (optimization)
// left-0 right-0 -> inset-x-0

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//allows conditional classes to be written
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}