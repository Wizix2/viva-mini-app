"use client";

import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
  showBottomNav?: boolean;
}

export default function Layout({
  children,
  title,
  showBackButton = false,
  backUrl = "/",
  showBottomNav = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-dark-300 text-white">
      <Header title={title} showBackButton={showBackButton} backUrl={backUrl} />
      
      <main className="flex-1 px-4 sm:px-6 pb-24 w-full max-w-screen-md mx-auto">
        {children}
      </main>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
}
