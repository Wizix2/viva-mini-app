export function goToResult(params: { id: string; type: "image" | "video" }) {
  if (typeof window === "undefined") return;

  const search = new URLSearchParams({
    id: params.id,
    type: params.type,
  });

  window.location.href = `/webapp/result?${search.toString()}`;
}
