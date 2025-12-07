"use client";

import { useEffect } from "react";

export default function TgPage() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "#fff" }}>VIVA Photo Animator — Mini App</h1>

      <button
        style={{
          marginTop: 20,
          padding: "12px 20px",
          width: "100%",
          fontWeight: "bold",
          background: "#FFD400",
          borderRadius: 10,
          border: "none",
        }}
        onClick={() => alert("Mini App Works!")}
      >
        Test Telegram Button
      </button>
    </div>
  );
}


