import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // ⛔ Если путь начинается с /tg → НЕ РЕНДЕРИМ САЙТ
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/tg")) {
    return children;
  }

  return (
    <html lang="en">
      <body>
        {/* старый сайт */}
        {children}
      </body>
    </html>
  );
}
