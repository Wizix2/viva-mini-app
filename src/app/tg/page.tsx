"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import useTelegram from "@/hooks/useTelegram";

export default function TgPage() {
  const tg = useTelegram();

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