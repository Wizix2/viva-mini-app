"use client";

import Link from "next/link";

export default function WebAppHistoryPage() {
  return (
    <div className="min-h-screen bg-[#0E0B19] text-white max-w-md mx-auto pb-24">

      <header className="px-5 py-4 bg-[#0D0A16] border-b border-[#1A1528] shadow flex justify-between items-center">
        <Link href="/webapp" className="p-2 rounded-lg hover:bg-[#1A1528]">
          <span className="text-[#FACC15]">←</span>
        </Link>
        <h1 className="text-lg font-semibold text-[#FACC15]">History</h1>
        <div className="w-6" />
      </header>

      <div className="p-5 space-y-6">
        <p className="text-gray-400 text-sm">
          Your generated images and videos will appear here.
        </p>

        <div className="bg-[#171322] p-6 rounded-xl text-center border border-[#1F1A2E]">
          <p className="text-gray-300">History is empty</p>
        </div>
      </div>
    </div>
  );
}
