"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "edge";

export const headers = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

import { useEffect, useState } from "react";
import useTelegram from "@/hooks/useTelegram";

export default function TgPage() {
  const tg = useTelegram();
  const [debugInfo, setDebugInfo] = useState({
    hasWindow: false,
    hasTelegram: false,
    hasWebApp: false,
    platform: null as string | null,
    initData: null as string | null,
  });

  if (typeof window !== "undefined") {
    window.Telegram = window.Telegram || {};
    window.Telegram.WebApp = window.Telegram.WebApp || {};
  }

  useEffect(() => {
    // защитимся от SSR
    if (typeof window === "undefined") return;

    const w = window as any;
    const telegram = w.Telegram;
    const webApp = telegram?.WebApp;

    // обновляем debug-панель
    setDebugInfo({
      hasWindow: true,
      hasTelegram: !!telegram,
      hasWebApp: !!webApp,
      platform: webApp?.platform ?? null,
      initData: webApp?.initData ?? null,
    });

    // аккуратная инициализация WebApp API
    webApp?.ready?.();
    webApp?.expand?.();
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
      
      {/* DEBUG PANEL – visible только тебе, помогает понять что видит Telegram */}
      <div
        style={{
          marginTop: 24,
          padding: 12,
          borderRadius: 8,
          background: "rgba(255,255,255,0.05)",
          fontSize: 11,
          textAlign: "left",
          wordBreak: "break-all",
        }}
      >
        <div style={{ marginBottom: 6, opacity: 0.7 }}>DEBUG • Telegram WebApp state</div>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            margin: 0,
            fontFamily: "monospace",
          }}
        >
{`hasWindow: ${String(debugInfo.hasWindow)}
hasTelegram: ${String(debugInfo.hasTelegram)}
hasWebApp: ${String(debugInfo.hasWebApp)}
platform: ${debugInfo.platform ?? "null"}
initData: ${debugInfo.initData ?? "null"}`}
        </pre>
      </div>
    </div>
  );
}