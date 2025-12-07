"use client";

import { motion } from "framer-motion";

export default function InspirationCard({
  title,
  image,
  onClick,
  delay = 0,
}: {
  title: string;
  image: string;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      onClick={onClick}
      className="
        cursor-pointer rounded-xl overflow-hidden
        bg-[#171322] shadow-lg shadow-black/30
        hover:scale-[1.02] transition-transform
      "
    >
      <div className="relative pb-[65%]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{title}</p>
      </div>
    </motion.div>
  );
}
