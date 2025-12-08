"use client";

export const dynamic = "force-dynamic";

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
  
  const [deepDebug, setDeepDebug] = useState({
    timestamp: null,
    userAgent: null,
    locationHref: null,
    referrer: null,

    tgObject: null,
    tgWebApp: null,

    initData: null,
    initDataUnsafe: null,

    platform: null,
    version: null,
    theme: null,

    canExpand: null,
    colorScheme: null,

    startParam: null,
  });

  useEffect(() => {
    const w = window as any;
    
    const result = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      locationHref: window.location.href,
      referrer: document.referrer,

      tgObject: w.Telegram ?? null,
      tgWebApp: w.Telegram?.WebApp ?? null,

      initData: w.Telegram?.WebApp?.initData ?? null,
      initDataUnsafe: w.Telegram?.WebApp?.initDataUnsafe ?? null,

      platform: w.Telegram?.WebApp?.platform ?? null,
      version: w.Telegram?.WebApp?.version ?? null,
      theme: w.Telegram?.WebApp?.themeParams ?? null,

      canExpand: w.Telegram?.WebApp?.isExpanded ?? null,
      colorScheme: w.Telegram?.WebApp?.colorScheme ?? null,

      startParam: w.Telegram?.WebApp?.initDataUnsafe?.start_param ?? null,
    };

    setDeepDebug(result);
    
    // Обновляем также старую debug-панель для совместимости
    setDebugInfo({
      hasWindow: true,
      hasTelegram: !!w.Telegram,
      hasWebApp: !!w.Telegram?.WebApp,
      platform: w.Telegram?.WebApp?.platform ?? null,
      initData: w.Telegram?.WebApp?.initData ?? null,
    });

    // попытка инициализации WebApp API
    try {
      w.Telegram?.WebApp?.ready();
      w.Telegram?.WebApp?.expand();
    } catch (e) {
      console.error("WebApp init error:", e);
    }
  }, []);

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
      
      <div style={{
        background: "#111",
        padding: 16,
        borderRadius: 10,
        marginTop: 20,
        color: "#0f0",
        fontSize: 12,
        whiteSpace: "pre-wrap",
        textAlign: "left",
        border: "1px solid #333"
      }}>
        <b>DEEP DEBUG • RAW Telegram WebApp State</b>
        <br /><br />
        {JSON.stringify(deepDebug, null, 2)}
      </div>
    </div>
  );
}