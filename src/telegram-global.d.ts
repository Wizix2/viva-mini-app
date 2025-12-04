declare global {
  interface TelegramUser {
    photo_url?: string;
    allows_write_to_pm?: boolean;
    [key: string]: any;
  }
}

export {};
