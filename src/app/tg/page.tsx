"use client";

import { useEffect } from "react";
import useTelegram from "@/hooks/useTelegram";

export default function TgPage() {
  const tg = useTelegram();
  
  useEffect(() => {
    if (!tg) return;
    
    // Initialize Telegram WebApp
    tg?.ready?.();
    tg?.expand?.();
  }, [tg]);
  
  return (
    <div style={{
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px"
      }}>
        VIVA Mini App — Loaded Successfully
      </h1>
      
      <div style={{
        marginTop: "20px",
        padding: "12px 24px",
        background: "#FFD400",
        color: "#000",
        borderRadius: "8px",
        fontWeight: "bold"
      }}>
        Telegram WebApp {tg ? "Connected" : "Loading..."}
      </div>
    </div>
  );
}