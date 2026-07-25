import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional classnames with tailwind-merge optimization.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
