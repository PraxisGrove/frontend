'use client';

import React from 'react';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { useAceternityTheme } from '@/components/aceternity/theme-provider';

function TestComponent() {
  const { theme, isDarkMode, toggleDarkMode } = useAceternityTheme();

  return (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="mb-4 text-4xl font-bold">Aceternity Theme Test</h1>
        <p className="mb-4 text-lg">当前模式: {isDarkMode ? '深色' : '浅色'}</p>
        <button
          onClick={toggleDarkMode}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
        >
          切换主题
        </button>
        <div className="bg-background/80 mt-8 rounded-lg border p-4 backdrop-blur-sm">
          <h2 className="mb-2 text-xl font-semibold">主题信息</h2>
          <pre className="text-sm">
            {JSON.stringify(
              {
                isDarkMode,
                beamColors: theme.colors.beam,
                animations: theme.animations.beam,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function TestAceternityPage() {
  return <TestComponent />;
}
