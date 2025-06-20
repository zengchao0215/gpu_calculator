'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const spring = useSpring(value, { 
    stiffness: 100, 
    damping: 30, 
    mass: 1 
  });
  
  const display = useTransform(spring, (current) => {
    if (format) {
      return format(Math.round(current * 10) / 10);
    }
    return (Math.round(current * 10) / 10).toFixed(1);
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span 
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  );
} 