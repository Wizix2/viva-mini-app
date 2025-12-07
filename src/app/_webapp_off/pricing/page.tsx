"use client";

import Link from "next/link";

export default function WebAppPricingPage() {
  return (
    <div className="min-h-screen bg-[#0E0B19] text-white max-w-md mx-auto pb-24">

      <header className="px-5 py-4 bg-[#0D0A16] border-b border-[#1A1528] shadow flex justify-between items-center">
        <Link href="/webapp" className="p-2 rounded-lg hover:bg-[#1A1528]">
          <span className="text-[#FACC15]">←</span>
        </Link>
        <h1 className="text-lg font-semibold text-[#FACC15]">Pricing</h1>
        <div className="w-6" />
      </header>

      <div className="p-5 space-y-6">
        <div className="bg-[#171322] p-6 rounded-xl border border-[#1F1A2E] shadow">
          <h3 className="text-xl font-semibold mb-2">Starter Pack</h3>
          <p className="text-gray-300 text-sm mb-3">50 credits</p>
          <button className="w-full bg-[#FACC15] text-black py-3 rounded-xl font-semibold">
            Buy — $4.99
          </button>
        </div>

        <div className="bg-[#171322] p-6 rounded-xl border border-[#1F1A2E] shadow">
          <h3 className="text-xl font-semibold mb-2">Pro Pack</h3>
          <p className="text-gray-300 text-sm mb-3">200 credits</p>
          <button className="w-full bg-[#FACC15] text-black py-3 rounded-xl font-semibold">
            Buy — $14.99
          </button>
        </div>
      </div>
    </div>
  );
}
