export function isTelegram() {
  if (typeof window === "undefined") return false;

  return (
    typeof (window as any).Telegram !== "undefined" &&
    typeof (window as any).Telegram.WebApp !== "undefined"
  );
}
