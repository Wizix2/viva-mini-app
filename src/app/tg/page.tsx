"use client";

import { useEffect } from "react";

export default function TgPage() {
  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (!tg) {
      console.warn("Telegram WebApp not found");
      return;
    }

    tg.ready();
    tg.expand();

    tg.MainButton.setParams({
      text: "Продолжить",
      is_visible: true,
    });

    tg.MainButton.onClick(() => {
      tg.showPopup({
        title: "Работает!",
        message: "Telegram Mini App API активировано 🎉",
      });
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>VIVA Mini App</h1>
      <p style={{ marginTop: 10, opacity: 0.8 }}>
        Telegram WebApp API успешно активировано.
      </p>
    </div>
  );
}
