import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatInTimeZone, toDate } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }
}

export const SYDNEY_TIMEZONE = "Australia/Sydney";

export function formatSydneyDate(date: string | Date) {
  return toDate(new Date(date), { timeZone: SYDNEY_TIMEZONE });
}

export function formatSydneyDateTime(date: string | Date, format: string) {
  return formatInTimeZone(date, SYDNEY_TIMEZONE, format);
}
