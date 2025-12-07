"use client";

export default function SkeletonBlock({ height = 20 }: { height?: number }) {
  return (
    <div
      style={{ height }}
      className="w-full bg-[#242034] rounded-lg animate-pulse"
    ></div>
  );
}
