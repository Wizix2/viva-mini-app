"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  telegramId?: string;
  className?: string;
}

export function ProfileHeader({
  username = "Guest",
  fullName,
  avatarUrl,
  telegramId,
  className = "",
}: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);

  // ❗ Больше НЕТ transition внутри variants → типизация проходит
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }} // <- вынесено сюда, теперь типы совпадают
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-5">

        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/30 border border-white/10 shadow-lg">
            {avatarUrl && !imageError ? (
              <Image
                src={avatarUrl}
                alt={username}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-viva-yellow/10">
                <User className="w-12 h-12 text-viva-yellow/70" />
              </div>
            )}
          </div>

          <div className="absolute -bottom-2 -right-2 bg-viva-yellow text-black text-xs font-bold px-2 py-1 rounded-full">
            PRO
          </div>
        </div>

        {/* User info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">
            {fullName || username}
          </h2>

          <div className="flex items-center text-white/60 mt-1 gap-2">
            <User className="w-4 h-4" />
            <span className="text-sm">@{username.toLowerCase()}</span>
          </div>

          {telegramId && (
            <div className="flex items-center text-white/60 mt-1 gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Telegram ID: {telegramId}</span>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/80 transition-all flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Share Profile</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileHeader;
