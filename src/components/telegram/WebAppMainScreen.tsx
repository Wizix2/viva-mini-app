"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

export default function WebAppMainScreen() {
  const { tg } = useTelegramWebApp();

  const [group, setGroup] = useState<"image" | "video">("image");
  const [tab, setTab] = useState<string>("txt2img");
  const [prompt, setPrompt] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const f = e.target.files[0];
    setFile(f);

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="min-h-screen bg-[#0E0B19] text-white pb-24 max-w-md mx-auto">

      {/* HEADER */}
      <header className="flex items-center justify-between p-4 bg-[#171322] border-b border-[#1F1A2E]">
        <div className="p-2 rounded-lg hover:bg-[#2A243B]">
          ☰
        </div>

        <h1 className="text-xl font-bold text-[#FACC15]">VIVA</h1>

        <div className="px-3 py-1 bg-[#1A142B] rounded-full text-xs text-[#FACC15]">
          120 credits
        </div>
      </header>

      <div className="p-4 space-y-6">

        {/* GROUP SWITCHER */}
        <div className="bg-[#171322] rounded-xl p-1 flex shadow-lg">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroup(g.id as any)}
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

        {/* TABS */}
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
                (tab === t.id
                  ? "text-white"
                  : "text-gray-400")
              }
            >
              {t.label}
              {tab === t.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FACC15]" />
              )}
            </button>
          ))}
        </div>

        {/* PROMPT or IMAGE INPUT */}

        {TABS[group].find((t) => t.id === tab)?.requiresText && (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="
              w-full h-32 p-4 bg-[#171322] rounded-xl border border-[#2B2342]
              focus:border-[#FACC15] outline-none resize-none shadow-lg
            "
          />
        )}

        {TABS[group].find((t) => t.id === tab)?.requiresImage && (
          <div
            onClick={() => inputRef.current?.click()}
            className="
              w-full p-6 border-2 border-dashed border-[#FACC15]/40 rounded-xl 
              bg-[#171322] text-center cursor-pointer shadow-lg
              hover:border-[#FACC15]
            "
          >
            {preview ? (
              <img
                src={preview}
                className="w-full rounded-lg shadow-md"
              />
            ) : (
              <>
                <div className="text-[#FACC15] text-3xl mb-3">📷</div>
                <p className="text-white font-medium">Upload image</p>
                <p className="text-gray-400 text-sm">Click to select</p>
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
          className="
            w-full py-4 rounded-xl text-black font-semibold text-lg
            bg-gradient-to-r from-[#FACC15] to-[#FBBF24]
            shadow-lg shadow-[#FACC15]/25 active:scale-[0.98]
          "
        >
          Generate
        </button>

        {/* PROMPT EXAMPLES */}
        {TABS[group].find((t) => t.id === tab)?.requiresText && (
          <div className="bg-[#171322] p-4 rounded-xl shadow-lg">
            <h3 className="text-[#FACC15] font-medium mb-3">Examples</h3>

            <div className="flex flex-wrap gap-2">
              {[
                "Beautiful cinematic portrait",
                "Ultra realistic landscape",
                "Epic fantasy character",
                "Cyberpunk neon city"
              ].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="
                    px-4 py-2 bg-[#1A142B] border border-[#2B2342]
                    rounded-lg text-sm hover:bg-[#2A243B]
                  "
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
