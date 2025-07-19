'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [beams, setBeams] = useState<
    Array<{ id: number; x: number; delay: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateBeams = () => {
      const newBeams = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setBeams(newBeams);
    };

    generateBeams();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
        className
      )}
    >
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"
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
            duration: 3,
            delay: beam.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};
