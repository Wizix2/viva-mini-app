"use client";

import { useState, useRef, ChangeEvent } from "react";
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

  const [group, setGroup] = useState<"image" | "video">("image");
  const [tab, setTab] = useState<string>("txt2img");
  const [prompt, setPrompt] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const currentTab =
    TABS[group].find((t) => t.id === tab) || TABS[group][0];

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
      const type: "image" | "video" =
        group === "image" ? "image" : "video";

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

      {/* CLEAN ARTIST-STYLE HEADER */}
      <header className="px-5 py-4 bg-[#0D0A16] border-b border-[#1A1528] shadow-md flex justify-between items-center">
        <span className="text-lg font-semibold tracking-wide text-[#FACC15]">
          VIVA
        </span>
        <span className="px-3 py-1 bg-[#1A1528] rounded-full text-xs text-[#FACC15] shadow">
          120 credits
        </span>
      </header>

      <div className="p-5 space-y-8">

        {/* GROUP SWITCHER */}
        <div className="bg-[#171322] rounded-xl p-1 flex shadow-inner shadow-black/20">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setGroup(g.id as any);
                const first = TABS[g.id as "image"][0];
                setTab(first.id);
                resetInputs();
              }}
              className={
                "flex-1 py-3 rounded-lg text-sm font-medium transition-all " +
                (group === g.id
                  ? "bg-[#FACC15] text-black shadow"
                  : "text-gray-400 hover:bg-[#1F1A2E]")
              }
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* TABS */}
        <div className="flex border-b border-[#1F1A2E]">
          {TABS[group].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                resetInputs();
              }}
              className={
                "relative py-3 px-4 font-medium transition-all text-sm " +
                (tab === t.id
                  ? "text-[#FACC15]"
                  : "text-gray-400 hover:text-gray-200")
              }
            >
              {t.label}
              {tab === t.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FACC15] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* PROMPT INPUT */}
        {currentTab.requiresText && (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create…"
            className="w-full h-32 p-4 bg-[#171322] rounded-xl border border-[#2B2342] focus:border-[#FACC15] shadow-inner shadow-black/30 outline-none resize-none"
          />
        )}

        {/* IMAGE INPUT */}
        {currentTab.requiresImage && (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-full p-6 border-2 border-dashed border-[#FACC15]/40 rounded-xl bg-[#171322] text-center cursor-pointer shadow-inner hover:border-[#FACC15]"
          >
            {preview ? (
              <img
                src={preview}
                className="w-full rounded-lg shadow-lg shadow-black/30"
              />
            ) : (
              <>
                <div className="text-[#FACC15] text-3xl mb-3">📁</div>
                <p className="text-white font-medium">Upload image</p>
                <p className="text-gray-400 text-sm">Tap to select</p>
              </>
            )}

            <input
              type="file"
              ref={inputRef}
              onChange={handleFile}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className={
            "w-full py-4 rounded-xl text-lg font-semibold transition-all shadow-lg " +
            (canGenerate && !isGenerating
              ? "text-[#0E0B19] bg-gradient-to-r from-[#FACC15] to-[#FBBF24] active:scale-[0.98]"
              : "bg-gray-600 text-gray-300 cursor-not-allowed")
          }
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        {/* EXAMPLES */}
        {presets.length > 0 && (
          <div className="bg-[#171322] p-5 rounded-xl shadow-inner shadow-black/20">
            <h3 className="text-[#FACC15] font-medium mb-4 text-lg tracking-wide">
              Examples
            </h3>

            <div className="flex flex-wrap gap-3">
              {presets.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setPrompt(ex.prompt)}
                  className="px-4 py-2 bg-[#1A142B] border border-[#2B2342] rounded-lg text-sm hover:bg-[#2A243B] transition-all"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
