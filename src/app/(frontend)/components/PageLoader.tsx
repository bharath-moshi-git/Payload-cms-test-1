'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const PageLoader: React.FC = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Reset states for page loading / transition
    setIsLoading(true);
    setIsExiting(false);
    setProgress(1);

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1200; // 1.2s synchronized loading

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      const currentProgress = Math.max(1, Math.round(rawProgress));

      // Synchronize exact progress value for both counter and filler line
      setProgress(currentProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Pause briefly at 100% then trigger exit curtain transition
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsLoading(false);
            setIsExiting(false);
          }, 650); // Matches CSS transition duration
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#05070B] text-slate-100 flex flex-col justify-between p-8 sm:p-12 transition-transform duration-700 cubic-bezier(0.76,0,0.24,1) select-none ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Top Header Information */}
      <div className="flex items-center justify-between font-mono text-xs text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E2C08D] animate-ping" />
          <span className="text-[#E2C08D]">AARDE PROJECTS</span>
        </div>
        <div>
          <span>SYSTEM // PRELOADER</span>
        </div>
      </div>

      {/* Center Watermark */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-6xl sm:text-8xl md:text-9xl text-white/[0.03] tracking-[0.25em] font-light uppercase select-none">
          AARDE
        </span>
      </div>

      {/* Bottom Center Loading Counter & Filler Line */}
      <div className="w-full max-w-md mx-auto space-y-4 pb-4">
        {/* Monospace 1 to 100 Counter */}
        <div className="text-center">
          <span className="font-mono text-4xl sm:text-5xl font-bold tracking-widest text-[#E2C08D]">
            {String(progress).padStart(3, '0')}
          </span>
          <span className="font-mono text-lg font-bold text-[#E2C08D] ml-1">%</span>
        </div>

        {/* Synchronized Filler Line (Progress Bar) */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#E2C08D] rounded-full shadow-[0_0_15px_#E2C08D]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle Label */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-400 pt-1">
          <span>[ LOADING ESTATE SPEC ]</span>
          <span>{progress === 100 ? 'READY' : 'PROCESSING'}</span>
        </div>
      </div>
    </div>
  );
};
