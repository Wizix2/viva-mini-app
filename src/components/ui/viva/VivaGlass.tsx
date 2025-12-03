"use client";

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface VivaGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'border';
  hover?: boolean;
  animate?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  motionProps?: MotionProps;
}

export function VivaGlass({
  children,
  variant = 'dark',
  hover = false,
  animate = false,
  padding = 'md',
  rounded = 'lg',
  className = '',
  motionProps,
  ...props
}: VivaGlassProps) {
  // Base classes
  const baseClass = variant === 'light' 
    ? 'glass' 
    : variant === 'border' 
      ? 'glass-border' 
      : 'glass-dark';
  
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
  
  // Rounded classes
  const roundedClass = rounded === 'none' 
    ? 'rounded-none' 
    : rounded === 'sm' 
      ? 'rounded-md' 
      : rounded === 'lg' 
        ? 'rounded-xl' 
        : rounded === 'xl' 
          ? 'rounded-2xl' 
          : rounded === 'full' 
            ? 'rounded-full' 
            : 'rounded-lg';
  
  // Hover classes
  const hoverClass = hover ? 'viva-hover' : '';
  
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
      className={`${baseClass} ${paddingClass} ${roundedClass} ${hoverClass} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div 
      className={`${baseClass} ${paddingClass} ${roundedClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default VivaGlass;
