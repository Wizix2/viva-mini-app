"use client";

import React from "react";
import type { MainMode } from "./MainModeTabs";

export type SubMode =
  | "text-image"
  | "image-image"
  | "text-video"
  | "image-video";

interface Props {
  mainMode: MainMode;
  value: SubMode;
  onChange: (newMode: SubMode) => void;
}

export default function SubModeSwitch({ mainMode, value, onChange }: Props) {
  const modes =
    mainMode === "image"
      ? [
          { id: "text-image", label: "Text → Image" },
          { id: "image-image", label: "Image → Image" },
        ]
      : [
          { id: "text-video", label: "Text → Video" },
          { id: "image-video", label: "Image → Video" },
        ];

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
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id as SubMode)}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 8,
            background: value === m.id ? "#FFD400" : "#333",
            color: value === m.id ? "#000" : "#aaa",
            border: "none",
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}