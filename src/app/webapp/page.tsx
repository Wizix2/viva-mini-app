"use client";

import { useEffect } from "react";
import WebAppMainScreen from "@/components/telegram/WebAppMainScreen";
import { useTelegram } from "@/hooks/useTelegram";

export default function WebAppPage() {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, [tg]);

  return <WebAppMainScreen />;
}
