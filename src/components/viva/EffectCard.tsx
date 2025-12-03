"use client";

import Link from "next/link";

interface EffectCardProps {
  icon: string;
  title: string;
  href: string;
}

export default function EffectCard({ icon, title, href }: EffectCardProps) {
  return (
    <Link href={href} className="block">
      <div className="premium-card h-[150px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-premium hover:-translate-y-1 rounded-2xl">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-white font-medium text-center px-2">{title}</h3>
      </div>
    </Link>
  );
}
