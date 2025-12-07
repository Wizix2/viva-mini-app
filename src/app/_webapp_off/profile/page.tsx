"use client";

import Link from "next/link";

export default function WebAppProfilePage() {
  return (
    <div className="min-h-screen bg-[#0E0B19] text-white max-w-md mx-auto pb-24">

      <header className="px-5 py-4 bg-[#0D0A16] border-b border-[#1A1528] shadow flex justify-between items-center">
        <Link href="/webapp" className="p-2 rounded-lg hover:bg-[#1A1528]">
          <span className="text-[#FACC15]">←</span>
        </Link>
        <h1 className="text-lg font-semibold text-[#FACC15]">Profile</h1>
        <div className="w-6" />
      </header>

      <div className="p-5 space-y-6">
        <div className="bg-[#171322] p-6 rounded-xl border border-[#1F1A2E]">
          <h2 className="text-xl font-semibold mb-2">User Info</h2>
          <p className="text-gray-300 text-sm">
            Telegram login integration coming soon.
          </p>
        </div>

        <div className="bg-[#171322] p-6 rounded-xl border border-[#1F1A2E]">
          <h2 className="text-xl font-semibold mb-2">Credits</h2>
          <p className="text-gray-300 text-sm">
            You currently have <span className="text-[#FACC15]">120</span> credits.
          </p>
        </div>
      </div>
    </div>
  );
}
