import type { ReactNode } from "react";

export const metadata = {
  title: "VIVA WebApp",
};

export default function WebAppRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0E0B19] text-white">
      {children}
    </div>
  );
}
