"use client";

import Link from "next/link";

export default function WebAppSidebar({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={
          "fixed top-0 left-0 h-full w-72 bg-[#0D0A16] z-50 shadow-xl border-r border-[#1A1528] transition-transform duration-300 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="p-5 border-b border-[#1A1528]">
          <h2 className="text-xl font-bold text-[#FACC15]">VIVA</h2>
        </div>

        <nav className="p-5 space-y-4 text-gray-300">
          <Link href="/webapp" onClick={onClose} className="block hover:text-white">
            Home
          </Link>

          <div className="text-xs text-gray-500 mt-4 mb-2">Generate</div>

          <Link href="/webapp?mode=image" onClick={onClose} className="block hover:text-white">
            Image
          </Link>

          <Link href="/webapp?mode=video" onClick={onClose} className="block hover:text-white">
            Video
          </Link>

          <div className="text-xs text-gray-500 mt-4 mb-2">My Data</div>

          <Link href="/webapp/history" onClick={onClose} className="block hover:text-white">
            History
          </Link>

          <Link href="/webapp/profile" onClick={onClose} className="block hover:text-white">
            Profile
          </Link>

          <div className="text-xs text-gray-500 mt-4 mb-2">Service</div>

          <Link href="/webapp/pricing" onClick={onClose} className="block hover:text-white">
            Pricing
          </Link>
        </nav>
      </div>
    </>
  );
}
