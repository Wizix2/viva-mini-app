import "@tma.js/sdk";

declare module "@tma.js/sdk" {
  interface TelegramUser {
    photo_url?: string;
  }
}
