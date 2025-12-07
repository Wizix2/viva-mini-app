"use client";

import { useEffect, useState } from "react";

export default function LaunchParamsPage() {
  const [params, setParams] = useState<any>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) setParams(tg.initDataUnsafe);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Launch Params</h1>
      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(params, null, 2)}
      </pre>
    </div>
  );
}

