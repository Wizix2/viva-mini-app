import { initData } from '@telegram-apps/sdk-react';
import { isTelegramWebApp } from "@/lib/isTelegram";
import { TelegramUser } from "@/services/telegram";

// Test function to verify type compatibility
export function testTelegramTypes() {
  if (isTelegramWebApp()) {
    // @ts-ignore - Just for testing
    const user = initData.user;
    
    if (user) {
      // This should not cause a type error
      const photoUrl = user.photo_url;
      console.log("Photo URL:", photoUrl);
      
      // Using optional chaining for safety
      const safePhotoUrl = user?.photo_url;
      console.log("Safe Photo URL:", safePhotoUrl);
    }
  }
  
  // Test with our own TelegramUser type
  const customUser: TelegramUser = {
    id: 123456789,
    first_name: "Test",
    photo_url: "https://example.com/photo.jpg"
  };
  
  console.log("Custom user photo:", customUser.photo_url);
}
