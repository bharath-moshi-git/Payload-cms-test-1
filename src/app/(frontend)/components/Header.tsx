import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  logoText?: string | null;
  logoSubtext?: string | null;
  headerCtaText?: string | null;
  headerCtaLink?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  logoText = 'A A R D E',
  logoSubtext = 'PROJECTS',
  headerCtaText = 'Book A Stay',
  headerCtaLink = '/contact',
}) => {
  return (
    <div className="w-full relative z-50">
      {/* Top Ticker Marquee Bar */}
      <div className="w-full bg-[#080B10] border-b border-white/5 py-1.5 overflow-hidden text-[10px] font-mono tracking-widest text-slate-400 uppercase select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          <span>AARDE ESTATE — COORG, KARNATAKA</span>
          <span className="text-[#E2C08D]">// LUXURY PRIVATE RESIDENCES & SANCTUARY</span>
          <span>EST. 2026 — COLD-PRESSED COFFEE & ORGANIC ESTATE</span>
          <span className="text-[#E2C08D]">// AWWWARDS SITE OF THE MONTH SPEC</span>
          <span>AARDE ESTATE — COORG, KARNATAKA</span>
          <span className="text-[#E2C08D]">// LUXURY PRIVATE RESIDENCES & SANCTUARY</span>
          <span>EST. 2026 — COLD-PRESSED COFFEE & ORGANIC ESTATE</span>
          <span className="text-[#E2C08D]">// AWWWARDS SITE OF THE MONTH SPEC</span>
        </div>
      </div>

      {/* Floating Capsule Header */}
      <header className="sticky top-4 pt-3 pb-1 px-4 max-w-7xl mx-auto">
        <div className="awwwards-glass rounded-full px-6 md:px-8 py-3 flex items-center justify-between shadow-2xl border border-white/10">
          {/* Awwwards Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#E2C08D] text-black font-serif font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-lg font-semibold text-slate-100 uppercase leading-none">
                {logoText || 'A A R D E'}
              </span>
              <span className="text-[9px] font-mono tracking-[0.35em] text-[#E2C08D] uppercase mt-0.5">
                {logoSubtext || 'PROJECTS'}
              </span>
            </div>
          </Link>

          {/* Indexed Editorial Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider text-slate-300">
            <Link href="/" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">01/</span>
              <span>Home</span>
            </Link>
            <Link href="/about" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">02/</span>
              <span>About</span>
            </Link>
            <Link href="/projects" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">03/</span>
              <span>Projects</span>
            </Link>
            <Link href="/blogs" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">04/</span>
              <span>Blog</span>
            </Link>
            <Link href="/careers" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">05/</span>
              <span>Careers</span>
            </Link>
            <Link href="/contact" className="hover:text-[#E2C08D] transition-colors flex items-center gap-1.5 py-1">
              <span className="text-[10px] text-slate-500">06/</span>
              <span>Contact</span>
            </Link>
          </nav>

          {/* Magnetic Gold CTA Pill */}
          {headerCtaText && (
            <Link
              href={headerCtaLink || '/contact'}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 group"
            >
              <span>{headerCtaText}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};
