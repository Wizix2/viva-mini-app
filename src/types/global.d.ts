import "@tma.js/sdk";

declare module "@tma.js/sdk" {
  interface TelegramUser {
    photo_url?: string;
    allows_write_to_pm?: boolean;
    [key: string]: any;
  }
}
