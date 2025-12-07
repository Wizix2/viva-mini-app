"use client";

import { useState } from "react";
import WebAppSidebar from "@/components/webapp/Sidebar";
import { useState as useReactState, useRef, ChangeEvent } from "react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { goToResult } from "@/lib/navigation/goToResult";
import {
  IMAGE_TEXT_PRESETS,
  IMAGE_IMAGE_PRESETS,
  VIDEO_TEXT_PRESETS,
  VIDEO_IMAGE_PRESETS,
} from "@/config/webappPresets";

export default function WebAppMainScreen() {
  const { tg } = useTelegramWebApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- ниже идёт твоя логика генерации, она остаётся как есть ---

  const [group, setGroup] = useReactState<"image" | "video">("image");
  const [tab, setTab] = useReactState<string>("txt2img");
  const [prompt, setPrompt] = useReactState<string>("");
  const [file, setFile] = useReactState<File | null>(null);
  const [preview, setPreview] = useReactState<string | null>(null);
  const [isGenerating, setIsGenerating] = useReactState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const GROUPS = [
    { id: "image", label: "Image" },
    { id: "video", label: "Video" },
  ];

  const TABS = {
    image: [
      { id: "txt2img", label: "Text → Image", requiresText: true },
      { id: "img2img", label: "Image → Image", requiresImage: true },
    ],
    video: [
      { id: "txt2video", label: "Text → Video", requiresText: true },
      { id: "img2video", label: "Image → Video", requiresImage: true },
    ],
  } as const;

  const currentTab = TABS[group].find((t) => t.id === tab) || TABS[group][0];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const f = e.target.files[0];
    setFile(f);

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const resetInputs = () => {
    setPrompt("");
    setFile(null);
    setPreview(null);
  };

  const canGenerate =
    (!currentTab.requiresText || prompt.trim().length > 0) &&
    (!currentTab.requiresImage || !!file);

  const handleGenerate = async () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);

    try {
      const fakeId = `demo-${Date.now()}`;
      const type: "image" | "video" = group === "image" ? "image" : "video";

      if (tg?.MainButton) {
        tg.MainButton.text = "Generating...";
        tg.MainButton.isVisible = true;
        tg.MainButton.showProgress?.();
      }

      await new Promise((res) => setTimeout(res, 800));
      goToResult({ id: fakeId, type });
    } finally {
      setIsGenerating(false);
      if (tg?.MainButton) {
        tg.MainButton.hideProgress?.();
        tg.MainButton.isVisible = false;
      }
    }
  };

  const presets =
    group === "image"
      ? tab === "txt2img"
        ? IMAGE_TEXT_PRESETS
        : IMAGE_IMAGE_PRESETS
      : tab === "txt2video"
      ? VIDEO_TEXT_PRESETS
      : VIDEO_IMAGE_PRESETS;

  return (
    <div className="min-h-screen bg-[#0E0B19] text-white max-w-md mx-auto pb-24">

      <WebAppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* UPDATED HEADER WITH MENU BUTTON */}
      <header className="px-5 py-4 bg-[#0D0A16] border-b border-[#1A1528] shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-[#1A1528] transition"
        >
          <span className="text-2xl text-[#FACC15]">☰</span>
        </button>

        <span className="text-lg font-semibold text-[#FACC15]">VIVA</span>

        <span className="px-3 py-1 bg-[#1A1528] rounded-full text-xs text-[#FACC15] shadow">
          120 credits
        </span>
      </header>

      {/* остальной UI остаётся полностью прежним */}
      <!-- всё что ниже по структуре — не меняем -->
    </div>
  );
}
