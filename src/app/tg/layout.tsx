"use client";

export default function TgLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ background: "#0B0B0F", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

