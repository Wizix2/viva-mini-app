"use client";

import { useEffect } from "react";

export default function TgPage() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (!tg) {
      console.warn("Telegram WebApp not found");
      return;
    }

    tg.ready();
    tg.expand();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 22, marginBottom: 10 }}>
        VIVA Photo Animator
      </h1>

      <p style={{ opacity: 0.8 }}>
        This is your Telegram Mini App root page.
      </p>

      <button
        style={{
          marginTop: 20,
          padding: "14px 20px",
          background: "#FFD400",
          color: "#000",
          borderRadius: 10,
          border: "none",
          fontWeight: "bold",
          width: "100%",
        }}
        onClick={() => alert("Action works inside Telegram!")}
      >
        Test Button
      </button>
    </div>
  );
}
