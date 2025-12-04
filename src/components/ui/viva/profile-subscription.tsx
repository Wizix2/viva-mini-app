"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Zap, Check, X } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface ProfileSubscriptionProps {
  className?: string;
  plans?: SubscriptionPlan[];
}

export default function ProfileSubscription({
  className = "",
  plans = []
}: ProfileSubscriptionProps) {
  // ✔ FIX: no transition inside variants (required by Framer Motion 11)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const defaultPlans: SubscriptionPlan[] = plans.length
    ? plans
    : [
        {
          id: "basic",
          name: "Basic",
          price: "$5 / month",
          features: ["100 credits", "Standard models"]
        },
        {
          id: "pro",
          name: "Pro",
          price: "$15 / month",
          features: ["500 credits", "Pro models", "Priority rendering"],
          highlighted: true
        },
        {
          id: "ultimate",
          name: "Ultimate",
          price: "$30 / month",
          features: [
            "Unlimited credits",
            "All models",
            "Fastest rendering",
            "VIP support"
          ]
        }
      ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} // ✔ Valid easing
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Crown className="w-5 h-5 text-viva-yellow" />
        Subscription Plans
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {defaultPlans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`rounded-2xl p-5 border ${
              plan.highlighted
                ? "bg-viva-yellow/20 border-viva-yellow shadow-viva-glow"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
              {plan.highlighted && (
                <Zap className="w-5 h-5 text-viva-yellow" />
              )}
            </div>

            <div className="text-2xl font-bold text-viva-yellow mt-3">
              {plan.price}
            </div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-white/80"
                >
                  <Check className="w-4 h-4 text-viva-yellow" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full mt-5 py-3 rounded-xl font-medium transition-all ${
                plan.highlighted
                  ? "bg-viva-yellow text-black shadow-viva-glow hover:bg-yellow-300"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
