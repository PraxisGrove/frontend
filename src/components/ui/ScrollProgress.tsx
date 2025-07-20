'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export function ScrollProgress({
  className,
  color = 'bg-gradient-to-r from-purple-500 to-blue-500',
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* 顶部进度条 */}
      <motion.div
        className={cn(
          'fixed left-0 right-0 top-0 z-50 origin-left',
          color,
          className
        )}
        style={{
          scaleX,
          height: `${height}px`,
        }}
      />

      {/* 百分比显示 */}
      {showPercentage && (
        <motion.div
          className="fixed right-4 top-4 z-50 rounded-full bg-black/80 px-3 py-1 text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollPercentage > 5 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
}
