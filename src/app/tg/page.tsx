"use client";

import { useEffect } from "react";

export default function TgPage() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.log("Not Telegram environment — OK for localhost.");
      return;
    }

    tg.ready();
    tg.expand();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>VIVA Mini App</h1>
      <p>This page runs inside Telegram WebApp.</p>
    </div>
  );
}
