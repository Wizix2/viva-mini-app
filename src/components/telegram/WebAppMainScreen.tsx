"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { goToResult } from "@/lib/navigation/goToResult";

import FadeIn from "./FadeIn";
import SkeletonBlock from "./SkeletonBlock";
import InspirationCard from "./InspirationCard";
import { PRESET_EXAMPLES } from "./presets";

export default function WebAppMainScreen() {
  const { tg, isReady } = useTelegramWebApp();

  const [group, setGroup] = useState<"image" | "video">("image");
  const [tab, setTab] = useState("txt2img");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const TABS = {
    image: [
      { id: "txt2img", label: "Text → Image", requiresText: true },
      { id: "img2img", label: "Image → Image", requiresImage: true },
    ],
    video: [
      { id: "txt2video", label: "Text → Video", requiresText: true },
      { id: "img2video", label: "Image → Video", requiresImage: true },
    ],
  };

  const GROUPS = [
    { id: "image", label: "Image" },
    { id: "video", label: "Video" },
  ];

  const currentTab =
    TABS[group].find((t) => t.id === tab) ?? TABS[group][0];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const f = e.target.files[0];
    setFile(f);

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const canGenerate =
    (!currentTab.requiresText || prompt.trim().length > 0) &&
    (!currentTab.requiresImage || file);

  const handleGenerate = async () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);

    const fakeId = `demo-${Date.now()}`;
    const type = group === "image" ? "image" : "video";

    await new Promise((res) => setTimeout(res, 800));

    goToResult({ id: fakeId, type });

    setIsGenerating(false);
  };

  // LOADING SKELETON (when Telegram WebApp not ready)
  if (!isReady) {
    return (
      <div className="p-6 space-y-4 max-w-md mx-auto">
        <SkeletonBlock height={40} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={200} />
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="min-h-screen bg-[#0E0B19] text-white pb-24 max-w-md mx-auto">

        {/* HEADER */}
        <header className="flex items-center justify-between p-4 bg-[#171322] border-b border-[#1F1A2E]">
          <div className="p-2 rounded-lg hover:bg-[#2A243B]">📁</div>
          <h1 className="text-xl font-bold text-[#FACC15]">VIVA</h1>
          <div className="px-3 py-1 bg-[#1A142B] rounded-full text-xs text-[#FACC15]">
            120 credits
          </div>
        </header>

        <div className="p-4 space-y-6">

          {/* GROUP SWITCHER */}
          <FadeIn delay={0.1}>
            <div className="bg-[#171322] rounded-xl p-1 flex shadow-lg">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setGroup(g.id as any);
                    setTab(TABS[g.id as "image" | "video"][0].id);
                    setPrompt("");
                    setFile(null);
                    setPreview(null);
                  }}
                  className={
                    "flex-1 py-3 rounded-lg text-sm font-medium transition " +
                    (group === g.id
                      ? "bg-[#FACC15] text-black"
                      : "text-gray-400")
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* TABS */}
          <FadeIn delay={0.15}>
            <div className="flex border-b border-[#1F1A2E]">
              {TABS[group].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setPrompt("");
                    setFile(null);
                    setPreview(null);
                  }}
                  className={
                    "relative py-3 px-4 font-medium text-sm " +
                    (tab === t.id ? "text-white" : "text-gray-400")
                  }
                >
                  {t.label}
                  {tab === t.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FACC15]" />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* PROMPT */}
          {currentTab.requiresText && (
            <FadeIn delay={0.2}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="
                  w-full h-32 p-4 bg-[#171322] rounded-xl border border-[#2B2342]
                  focus:border-[#FACC15] outline-none resize-none shadow-lg
                "
              />
            </FadeIn>
          )}

          {/* IMAGE UPLOAD */}
          {currentTab.requiresImage && (
            <FadeIn delay={0.25}>
              <div
                onClick={() => inputRef.current?.click()}
                className="
                  w-full p-6 border-2 border-dashed border-[#FACC15]/40 rounded-xl
                  bg-[#171322] text-center cursor-pointer shadow-lg
                  hover:border-[#FACC15]
                "
              >
                {preview ? (
                  <img src={preview} className="w-full rounded-lg shadow-md" />
                ) : (
                  <>
                    <div className="text-[#FACC15] text-3xl mb-3">📷</div>
                    <p className="text-white font-medium">Upload image</p>
                    <p className="text-gray-400 text-sm">Click to select</p>
                  </>
                )}
                <input
                  ref={inputRef}
                  onChange={handleFile}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </FadeIn>
          )}

          {/* GENERATE BUTTON */}
          <FadeIn delay={0.3}>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={
                "w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all " +
                (canGenerate
                  ? "bg-gradient-to-r from-[#FACC15] to-[#FBBF24] text-black active:scale-95"
                  : "bg-gray-600 text-gray-300")
              }
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </FadeIn>

          {/* INSPIRATION GRID */}
          <FadeIn delay={0.35}>
            <div>
              <h3 className="text-[#FACC15] font-medium mb-3">
                Inspiration for you
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {PRESET_EXAMPLES.map((preset, i) => (
                  <InspirationCard
                    key={preset.title}
                    title={preset.title}
                    image={preset.image}
                    delay={0.05 * i}
                    onClick={() => {
                      if (currentTab.requiresText) {
                        setPrompt(preset.prompt);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </FadeIn>
  );
}

