"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap, ArrowRight } from 'lucide-react';

type SubscriptionTier = 'free' | 'pro' | 'ultra';

interface ProfileSubscriptionProps {
  tier?: SubscriptionTier;
  className?: string;
  onUpgrade?: () => void;
}

export function ProfileSubscription({
  tier = 'free',
  className = "",
  onUpgrade
}: ProfileSubscriptionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (custom * 0.1),
        duration: 0.4
      }
    })
  };

  // Determine tier details
  const tierDetails = {
    free: {
      name: "Free",
      icon: Star,
      color: "text-white",
      bgColor: "bg-white/10",
      borderColor: "border-white/10",
      features: [
        "100 credits per month",
        "Basic image generation",
        "Standard resolution",
        "Community support"
      ],
      upgradeText: "Upgrade to Pro"
    },
    pro: {
      name: "Professional",
      icon: Crown,
      color: "text-viva-yellow",
      bgColor: "bg-viva-yellow/10",
      borderColor: "border-viva-yellow/30",
      features: [
        "1000 credits per month",
        "Advanced image & video generation",
        "HD resolution",
        "Priority support",
        "Commercial usage rights"
      ],
      upgradeText: "Upgrade to Ultra"
    },
    ultra: {
      name: "Ultra",
      icon: Zap,
      color: "text-viva-yellow",
      bgColor: "bg-viva-yellow/20",
      borderColor: "border-viva-yellow/40",
      features: [
        "Unlimited credits",
        "All generation features",
        "4K resolution",
        "24/7 priority support",
        "Commercial usage rights",
        "API access",
        "White-label exports"
      ],
      upgradeText: "Current Plan"
    }
  };
  
  const currentTier = tierDetails[tier];
  const IconComponent = currentTier.icon;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-5">Your Subscription</h3>
      
      {/* Current tier */}
      <div className={`p-4 rounded-xl ${currentTier.bgColor} ${currentTier.borderColor} border mb-5`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${currentTier.bgColor} border ${currentTier.borderColor} flex items-center justify-center`}>
            <IconComponent className={`w-5 h-5 ${currentTier.color}`} />
          </div>
          <div>
            <div className={`font-bold text-lg ${currentTier.color}`}>{currentTier.name}</div>
            <div className="text-sm text-white/60">Current Plan</div>
          </div>
        </div>
      </div>
      
      {/* Features list */}
      <div className="space-y-3 mb-6">
        {currentTier.features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3"
          >
            <div className={`w-5 h-5 rounded-full ${currentTier.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Check className={`w-3 h-3 ${currentTier.color}`} />
            </div>
            <span className="text-white/80">{feature}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Upgrade button - only show if not on Ultra plan */}
      {tier !== 'ultra' && (
        <motion.button
          whileHover={{ scale: 1.03, backgroundColor: "rgba(245, 215, 66, 0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onUpgrade}
          className={`w-full py-3 px-5 ${currentTier.bgColor} ${currentTier.color} font-medium rounded-xl flex items-center justify-center gap-2 transition-all border ${currentTier.borderColor}`}
        >
          <span>{currentTier.upgradeText}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
      
      {/* Plan info for Ultra */}
      {tier === 'ultra' && (
        <div className="text-center text-white/50 text-sm">
          Your Ultra plan is active until December 31, 2025
        </div>
      )}
    </motion.div>
  );
}

export default ProfileSubscription;
