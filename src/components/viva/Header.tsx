"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function Header({ title, showBackButton = false, backUrl = "/" }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="w-full px-4 sm:px-6 py-5 flex items-center justify-between max-w-screen-md mx-auto">
      <div className="flex items-center">
        {showBackButton && (
          <Link 
            href={backUrl} 
            className="mr-4 text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center w-8 h-8 rounded-full hover:bg-dark-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
        
        {isHomePage ? (
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold gradient-text">VIVA</h1>
            <p className="text-sm text-gray-400">Создавай AI-эффекты за секунды</p>
          </div>
        ) : (
          <h1 className="text-xl font-bold text-white">{title}</h1>
        )}
      </div>
    </header>
  );
}
