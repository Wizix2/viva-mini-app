"use client";

export const dynamic = "force-dynamic";

// пустая server action заставляет Next.js НЕ рендерить статик
export async function action() {
  "use server";
}

import React from "react";

export default function TgLayout({ children }) {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
