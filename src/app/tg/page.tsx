"use client";

import { useEffect } from "react";

export default function TgPage() {
  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 22, marginBottom: 10 }}>
        VIVA Photo Animator — Mini App
      </h1>

      <button
        style={{
          marginTop: 20,
          padding: "14px 20px",
          background: "#FFD400",
          color: "#000",
          borderRadius: 10,
          border: "none",
          fontWeight: "bold",
          width: "100%"
        }}
        onClick={() => alert("TG Mini App works!")}
      >
        Test Telegram Button
      </button>
    </div>
  );
}
