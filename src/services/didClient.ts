export function getAuthHeader() {
  const key = process.env.DID_API_KEY;
  if (!key) {
    throw new Error("DID_API_KEY is missing");
  }
  // D-ID принимает ключ без base64 — прямо в формате username:password
  return "Basic " + key;
}
