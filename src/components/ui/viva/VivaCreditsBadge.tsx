"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface VivaCreditsBadgeProps {
  credits: number;
}

export function VivaCreditsBadge({ credits }: VivaCreditsBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-full border border-yellow-400/30 shadow-yellow-glow-lg"
    >
      <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
      <span className="text-yellow-400 font-medium">{credits}</span>
      <span className="ml-1 text-xs text-yellow-400/70">credits</span>
    </motion.div>
  );
}

export default VivaCreditsBadge;
