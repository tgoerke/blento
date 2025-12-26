import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export * from './avatar';
export * from './bluesky-login';
export * from './button';
export * from './heading';
export * from './input';
export * from './label';
export * from './modal';
export * from './navbar';
export * from './sonner';
