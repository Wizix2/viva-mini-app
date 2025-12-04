"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VivaButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  vibrate?: boolean;
  glow?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function VivaButton({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  vibrate = false,
  glow = false,
  icon,
  iconPosition = "left",
  disabled = false,
  className = "",
  onClick,
}: VivaButtonProps) {
  // Variant classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    outline:
      "bg-transparent border border-white/20 text-white hover:bg-white/5",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  // Size classes
  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "py-2.5 px-5",
    lg: "text-lg py-3.5 px-7",
  };

  // Other classes
  const widthClass = fullWidth ? "w-full" : "";
  const vibrateClass = vibrate ? "animate-vibrate" : "";
  const glowClass = glow ? "yellow-glow hover:yellow-glow-lg" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // Common classes
  const buttonClasses = `
    rounded-xl flex items-center justify-center transition-all duration-300
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${vibrateClass}
    ${glowClass}
    ${disabledClass}
    ${className}
  `;

  // Animation props (БЕЗ transition, чтобы не ломать типы)
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
  };

  // Button content
  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  // Render as link or button
  if (href) {
    return (
      <Link href={href} passHref>
        <motion.a className={buttonClasses} {...motionProps} onClick={onClick}>
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

export default VivaButton;
