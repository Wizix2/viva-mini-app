"use client";

import { useEffect, useState } from "react";

export default function DebugPanel({ tg }: { tg: any }) {
  const [info, setInfo] = useState<any>({
    windowTelegram: false,
    webAppExists: false,
    methods: [],
    launchParams: null,
  });

  useEffect(() => {
    const w = typeof window !== "undefined" ? (window as any) : null;
    const winTG = w?.Telegram || null;
    const webapp = winTG?.WebApp || null;

    setInfo({
      windowTelegram: Boolean(winTG),
      webAppExists: Boolean(webapp),
      methods: webapp ? Object.keys(webapp).filter(k => typeof webapp[k] === "function") : [],
      launchParams: webapp?.initDataUnsafe || null,
    });

    console.log("DEBUG: window.Telegram =", winTG);
    console.log("DEBUG: WebApp =", webapp);
    console.log("DEBUG: tg from hook =", tg);
  }, [tg]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(0,0,0,0.8)",
        color: "#0f0",
        padding: "10px",
        fontSize: "12px",
        zIndex: 9999,
        maxHeight: "40vh",
        overflowY: "auto",
      }}
    >
      <b>DEBUG PANEL (Telegram WebApp)</b>
      <div>window.Telegram: {String(info.windowTelegram)}</div>
      <div>Telegram.WebApp exists: {String(info.webAppExists)}</div>

      <div style={{ marginTop: "5px" }}>
        <b>Available methods:</b>
        <pre>{JSON.stringify(info.methods, null, 2)}</pre>
      </div>

      <div style={{ marginTop: "5px" }}>
        <b>tg from hook:</b>
        <pre>{JSON.stringify(Object.keys(tg || {}), null, 2)}</pre>
      </div>

      <div style={{ marginTop: "5px" }}>
        <b>Launch Params (initDataUnsafe):</b>
        <pre>{JSON.stringify(info.launchParams, null, 2)}</pre>
      </div>
    </div>
  );
}
