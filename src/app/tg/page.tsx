"use client";

export const dynamic = "force-dynamic";

// ⬅️ ДОБАВЛЯЕМ server action
export async function action() {
  "use server";
}

import { useEffect } from "react";
import useTelegram from "@/hooks/useTelegram";

export default function TgPage() {
  const tg = useTelegram();

  useEffect(() => {
    tg?.ready?.();
    tg?.expand?.();
  }, [tg]);

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>VIVA Mini App — Loaded Successfully</h1>

      <p
        style={{
          marginTop: 16,
          padding: "12px 18px",
          background: "#FFD400",
          color: "#000",
          borderRadius: 6,
          fontWeight: "bold",
        }}
      >
        Telegram WebApp: {tg ? "Connected" : "Loading..."}
      </p>
    </div>
  );
}
