"use client";

import Link from "next/link";

interface FABProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
}

export default function FAB({ href, icon, label }: FABProps) {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
      <Link
        href={href}
        className="fab-button flex items-center justify-center px-6 py-3 text-white font-medium rounded-full"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Link>
    </div>
  );
}
