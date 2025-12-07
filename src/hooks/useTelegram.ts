"use client";

export default function useTelegram() {
  if (typeof window === "undefined") return null;
  return (window as any).Telegram?.WebApp ?? null;
}