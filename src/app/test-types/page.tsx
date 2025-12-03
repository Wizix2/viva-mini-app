"use client";

import { useState, useEffect } from "react";
import { isTelegramWebApp } from "@/lib/isTelegram";
import TelegramService, { TelegramUser } from "@/services/telegram";
import { useTelegram } from "@/contexts/TelegramContext";

export default function TestTypesPage() {
  const { user } = useTelegram();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Test with context user
    if (user && user.photo_url) {
      setPhotoUrl(user.photo_url);
    }
    
    // Test with direct access
    if (isTelegramWebApp()) {
      const directUser = TelegramService.getUser();
      if (directUser?.photo_url) {
        console.log("Direct photo URL:", directUser.photo_url);
      }
    }
  }, [user]);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">TypeScript Test Page</h1>
      
      <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl mb-2">User Info</h2>
        
        {user ? (
          <div>
            <p>Name: {user.first_name} {user.last_name}</p>
            {user.photo_url ? (
              <div>
                <p className="mb-2">Photo URL: {user.photo_url}</p>
                <img 
                  src={user.photo_url} 
                  alt="User avatar" 
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ) : (
              <p>No photo available</p>
            )}
          </div>
        ) : (
          <p>No user information available</p>
        )}
      </div>
    </div>
  );
}
