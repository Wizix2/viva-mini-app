"use client";

export default function TgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      background: "#000", 
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      {children}
    </div>
  );
}