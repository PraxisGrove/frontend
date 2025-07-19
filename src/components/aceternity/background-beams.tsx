'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAceternityTheme } from './theme-provider';

export const BackgroundBeams = ({
  className,
  beamCount = 20,
  animationDuration = 3,
  repeatDelay = 2,
}: {
  className?: string;
  beamCount?: number;
  animationDuration?: number;
  repeatDelay?: number;
}) => {
  const { theme } = useAceternityTheme();
  const [beams, setBeams] = useState<
    Array<{ id: number; x: number; delay: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateBeams = () => {
      const newBeams = Array.from({ length: beamCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * repeatDelay,
      }));
      setBeams(newBeams);
    };

    generateBeams();
  }, [beamCount, repeatDelay]);

  return (
    <div
      ref={containerRef}
      className={cn('aceternity-background-beams', className)}
    >
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className={cn('aceternity-beam', beam.id % 3 === 0 && 'enhanced')}
          style={{
            left: `${beam.x}%`,
            height: '100%',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: animationDuration,
            delay: beam.delay,
            repeat: Infinity,
            repeatDelay: repeatDelay,
            ease: theme.animations.beam.ease,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};
