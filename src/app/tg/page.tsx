export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "edge";

export const headers = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

"use client";

import { useEffect } from "react";
import useTelegram from "@/hooks/useTelegram";

export default function TgPage() {
  const tg = useTelegram();

  if (typeof window !== "undefined") {
    window.Telegram = window.Telegram || {};
    window.Telegram.WebApp = window.Telegram.WebApp || {};
  }

  useEffect(() => {
    tg?.ready?.();
    tg?.expand?.();
  }, [tg]);

  return (
    <div style={{
      padding: 24,
      textAlign: "center",
      marginTop: 80
    }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        VIVA Mini App — Loaded Successfully
      </h1>

      <p style={{
        marginTop: 20,
        padding: "12px 20px",
        borderRadius: 6,
        background: "#FFD400",
        color: "#000",
        display: "inline-block",
        fontWeight: "bold"
      }}>
        Telegram WebApp: {tg ? "Connected" : "Loading..."}
      </p>
    </div>
  );
}