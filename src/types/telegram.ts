import { TelegramUser } from "@/services/telegram";

export interface TelegramUserFixed extends TelegramUser {
  photo_url?: string;
  allows_write_to_pm?: boolean;
}
