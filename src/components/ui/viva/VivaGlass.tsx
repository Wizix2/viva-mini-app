"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface VivaGlassProps {
  children: ReactNode;
  animate?: boolean;
  className?: string;
}

/**  
 * FIX: Ограничиваем пропсы вручную  
 * вместо передачи ВСЕХ HTML props в motion.div  
 */
export default function VivaGlass({
  children,
  animate = true,
  className = "",
}: VivaGlassProps) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // 🔥 Если анимация включена → motion.div
  if (animate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4 }}
        className={`rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  // 🔥 Если анимация выключена → обычный div
  return (
    <div
      className={`rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
