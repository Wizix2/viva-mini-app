"use client";

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface VivaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  animate?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  motionProps?: MotionProps;
}

export function VivaCard({
  children,
  hover = false,
  animate = false,
  glow = false,
  padding = 'md',
  className = '',
  motionProps,
  ...props
}: VivaCardProps) {
  // Padding classes
  const paddingClass = padding === 'none' 
    ? '' 
    : padding === 'sm' 
      ? 'p-4' 
      : padding === 'lg' 
        ? 'p-8' 
        : padding === 'xl' 
          ? 'p-10' 
          : 'p-6';
  
  // Hover and glow classes
  const hoverClass = hover ? 'viva-hover' : '';
  const glowClass = glow ? 'yellow-glow-hover' : '';
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return animate ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className={`viva-card ${paddingClass} ${hoverClass} ${glowClass} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div 
      className={`viva-card ${paddingClass} ${hoverClass} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default VivaCard;
