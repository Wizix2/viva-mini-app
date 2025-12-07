import "./globals.css";
import { Inter } from "next/font/google";
import ClientShell from "./ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VIVA Photo Animator",
  description: "AI photo & video generation powered by Telegram",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
