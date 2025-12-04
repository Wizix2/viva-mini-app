export function isTelegram() {
  if (typeof window === "undefined") return false;

  return (
    typeof window.Telegram !== "undefined" &&
    typeof window.Telegram.WebApp !== "undefined"
  );
}

}