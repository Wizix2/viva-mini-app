"use client";

import Link from "next/link";

interface EffectCardProps {
  icon: string;
  title: string;
  href: string;
  className?: string;
}

export default function EffectCard({ icon, title, href, className = '' }: EffectCardProps) {
  return (
    <Link href={href} className="block">
      <div className={`premium-card h-[150px] flex flex-col items-center justify-center transition-all duration-300 rounded-2xl relative overflow-hidden group ${className}`}>
        <div className="absolute inset-0 bg-shimmer bg-[length:500px_100%] animate-shimmer opacity-0 group-hover:opacity-100"></div>
        <div className="text-3xl mb-3 relative z-10">{icon}</div>
        <h3 className="text-white font-medium text-center px-2 relative z-10">{title}</h3>
      </div>
    </Link>
  );
}
