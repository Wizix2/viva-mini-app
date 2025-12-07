"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModelSelect } from "@/components/ui/viva";

export default function ModelDemoPage() {
  const [selectedModelId, setSelectedModelId] = useState<string>("");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">AI Model Selection</h1>
        <p className="text-white/70">
          Artlist-inspired model selection panel with premium glass morphism design
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <ModelSelect
          title="Choose AI Model"
          subtitle="Select the perfect model for your creative needs"
          onModelSelect={(modelId) => {
            setSelectedModelId(modelId);
            console.log(`Selected model: ${modelId}`);
          }}
        />
        
        {selectedModelId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="viva-card"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Selected Model ID</h2>
            <div className="bg-white/10 p-4 rounded-xl">
              <code className="text-viva-yellow">{selectedModelId}</code>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
