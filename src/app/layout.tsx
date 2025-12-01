import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import ClientOnly from "./ClientOnly";
import Wrapper from "./Wrapper";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";

export const metadata: Metadata = {
  title: "VIVA — Оживи свои фото с ИИ",
  description: "Создавай AI-видео и улучшай фото за 10 секунд",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  manifest: "/manifest.json",
  icons: { 
    icon: "/favicon.ico", 
    apple: "/apple-icon.png" 
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://viva-ai.vercel.app/",
    title: "VIVA — Оживи свои фото с ИИ",
    description: "Создавай AI-видео и улучшай фото за 10 секунд прямо в Telegram",
    siteName: "VIVA AI"
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-dark-300 text-white">
        <ClientOnly>
          <Wrapper>{children}</Wrapper>
        </ClientOnly>
      </body>
    </html>
  );
}