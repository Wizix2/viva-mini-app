"use client";

export default function useTelegram() {
  if (typeof window === "undefined") return { tg: null };

  const tg = (window as any).Telegram?.WebApp ?? null;

  return { tg };
}