"use client";

import { VivaThemeDemo } from "@/components/ui/viva";
import { Layout } from "@/components/viva";

export default function DesignSystemPage() {
  return (
    <Layout title="Design System">
      <div className="max-w-4xl mx-auto">
        <VivaThemeDemo />
      </div>
    </Layout>
  );
}
