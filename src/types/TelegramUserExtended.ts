import type { TelegramUser } from "@tma.js/sdk";

export interface TelegramUserExtended extends TelegramUser {
  photo_url?: string;
  allows_write_to_pm?: boolean;
}
