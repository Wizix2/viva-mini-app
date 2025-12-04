"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface VivaCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function VivaCard({
  children,
  className = "",
  animate = true,
}: VivaCardProps) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Внимание: НИКАКИХ ...props внутрь motion.div
  // Иначе прилетает ошибка типов framer-motion
  if (animate) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}


export default VivaCard;
