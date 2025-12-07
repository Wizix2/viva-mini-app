"use client";

export default function Header({ credits = 0 }: { credits?: number }) {
  return (
    <div
      style={{
        padding: 16,
        fontSize: 20,
        fontWeight: "bold",
        borderBottom: "1px solid #333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>VIVA Mini App</span>

      <span
        style={{
          background: "#FFD400",
          color: "#000",
          padding: "6px 12px",
          borderRadius: 8,
          fontWeight: "bold",
        }}
      >
        {credits} credits
      </span>
    </div>
  );
}