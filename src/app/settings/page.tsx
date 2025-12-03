"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  Download,
  Check
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [language, setLanguage] = useState("english");
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/70">
          Customize your experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium text-white mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Dark Mode</h3>
                    <p className="text-sm text-white/50">
                      {darkMode ? "Currently using dark theme" : "Switch to dark theme"}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    darkMode ? "bg-yellow-400" : "bg-white/20"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: darkMode ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Bell className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Notifications</h3>
                    <p className="text-sm text-white/50">
                      Get notified when generations complete
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    notifications ? "bg-yellow-400" : "bg-white/20"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: notifications ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Download className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Auto-download</h3>
                    <p className="text-sm text-white/50">
                      Automatically download generations
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setAutoDownload(!autoDownload)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    autoDownload ? "bg-yellow-400" : "bg-white/20"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: autoDownload ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Globe className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Language</h3>
                    <p className="text-sm text-white/50">
                      Select your preferred language
                    </p>
                  </div>
                </div>
                
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="japanese">Japanese</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Shield className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Privacy Mode</h3>
                    <p className="text-sm text-white/50">
                      Hide your generations from public library
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    privacyMode ? "bg-yellow-400" : "bg-white/20"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: privacyMode ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium text-white mb-6">Subscription</h2>
            
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Pro Plan</h3>
                <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-medium">
                  Current
                </span>
              </div>
              
              <p className="text-sm text-white/70 mt-2">$19.99/month</p>
              
              <ul className="mt-4 space-y-2">
                {["200 credits/month", "4K resolution", "Priority support", "Commercial use"].map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-white/70">
                    <Check className="w-4 h-4 text-yellow-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 text-xs text-white/50">
                Next billing date: June 15, 2023
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Manage Subscription
              </motion.button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Account</h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Change Password
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Export Data
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium rounded-lg transition-colors"
                >
                  Delete Account
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
