"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ProfileHeader,
  ProfileCredits,
  ProfileSubscription,
  ProfileSettings
} from "@/components/ui/viva";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";

export default function Profile() {
  const { user } = useTelegram();
  const [username, setUsername] = useState("JohnDoe");
  const [fullName, setFullName] = useState("John Doe");
  const [avatarUrl, setAvatarUrl] = useState("/avatar-placeholder.jpg");
  const [credits, setCredits] = useState(750);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'ultra'>('pro');
  
  // Load user data from Telegram if available
  useEffect(() => {
    if (isTelegramWebApp() && user?.photo_url) {
      setAvatarUrl(user.photo_url!);
    }
    
    if (user) {
      setUsername(user.username || user.first_name);
      setFullName(`${user.first_name} ${user.last_name || ''}`);
    }
  }, [user]);
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Mock handlers
  const handleBuyCredits = () => {
    console.log("Buy credits clicked");
  };
  
  const handleViewTransactions = () => {
    console.log("View transactions clicked");
  };
  
  const handleUpgrade = () => {
    console.log("Upgrade subscription clicked");
  };
  
  const handleClearCache = () => {
    console.log("Clear cache clicked");
  };
  
  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
        <p className="text-white/70">
          Manage your account, subscription, and settings
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Header */}
        <ProfileHeader 
          username={username}
          fullName={fullName}
          avatarUrl={avatarUrl}
          telegramId={user?.id?.toString() || "123456789"}
        />
        
        {/* Credits Section */}
        <ProfileCredits 
          credits={credits}
          onBuyCredits={handleBuyCredits}
          onViewTransactions={handleViewTransactions}
        />
        
        {/* Subscription Section */}
        <ProfileSubscription 
          tier={subscriptionTier}
          onUpgrade={handleUpgrade}
        />
        
        {/* Settings Section */}
        <ProfileSettings 
          onClearCache={handleClearCache}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
    </motion.div>
  );
}