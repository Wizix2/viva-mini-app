"use client";

import React from "react";

export type MainMode = "image" | "video";

interface Props {
  value: MainMode;
  onChange: (newMode: MainMode) => void;
}

export default function MainModeTabs({ value, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 20,
        background: "#222",
        padding: 6,
        borderRadius: 10,
      }}
    >
      <button
        onClick={() => onChange("image")}
        style={{
          flex: 1,
          padding: "10px 0",
          borderRadius: 8,
          background: value === "image" ? "#FFD400" : "#333",
          color: value === "image" ? "#000" : "#aaa",
          border: "none",
          fontWeight: "bold",
        }}
      >
        Image
      </button>

      <button
        onClick={() => onChange("video")}
        style={{
          flex: 1,
          padding: "10px 0",
          borderRadius: 8,
          background: value === "video" ? "#FFD400" : "#333",
          color: value === "video" ? "#000" : "#aaa",
          border: "none",
          fontWeight: "bold",
        }}
      >
        Video
      </button>
    </div>
  );
}