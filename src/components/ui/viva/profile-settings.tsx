"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, ShieldCheck, Languages } from "lucide-react";

interface ProfileSettingsProps {
  className?: string;
}

export default function ProfileSettings({ className = "" }: ProfileSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");
  const [language, setLanguage] = useState("en");

  // ❗ Исправленные variants — БЕЗ transition
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}  // ✔ типизация правильная
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-viva-yellow" />
        Settings
      </h3>

      {/* Notifications */}
      <div className="mb-5">
        <label className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="text-white">Notifications</span>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5"
          />
        </label>
      </div>

      {/* Privacy */}
      <div className="mb-5">
        <label className="flex items-center gap-3 text-white mb-2">
          <ShieldCheck className="w-5 h-5 text-white/60" />
          Privacy
        </label>

        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
        >
          <option value="public">Public</option>
          <option value="friends">Friends only</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Language */}
      <div className="mb-5">
        <label className="flex items-center gap-3 text-white mb-2">
          <Languages className="w-5 h-5 text-white/60" />
          Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      <div className="text-xs text-white/40 mt-4">
        Changes are saved automatically.
      </div>
    </motion.div>
  );
}

