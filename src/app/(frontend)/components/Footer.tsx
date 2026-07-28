import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#040609] pt-20 pb-12 text-slate-400 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-[#E2C08D] text-black font-serif font-bold text-base flex items-center justify-center group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-xl font-medium text-slate-100 uppercase">
                  AARDE Projects
                </span>
                <span className="text-[9px] font-mono tracking-[0.35em] text-[#E2C08D] uppercase mt-0.5">
                  Coorg Luxury Estate
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed pt-2">
              Sustainable luxury residences and sanctuary in the heart of Coorg, Karnataka. Crafted with architectural precision.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] block mb-2">
              [ NAVIGATION ]
            </span>
            <ul className="space-y-2 text-xs font-mono tracking-wider">
              <li>
                <Link href="/" className="hover:text-[#E2C08D] transition-colors">01/ Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E2C08D] transition-colors">02/ About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#E2C08D] transition-colors">03/ Projects</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#E2C08D] transition-colors">04/ Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#E2C08D] transition-colors">05/ Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E2C08D] transition-colors">06/ Contact</Link>
              </li>
            </ul>
          </div>

          {/* System & Portal Links Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] block mb-2">
              [ SYSTEM & ADMIN ]
            </span>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
              <div className="text-slate-500">
                LOCATION // COORG 12° 25' N 75° 44' E
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all"
                >
                  <span>Payload CMS Admin</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Large Watermark Brand Text */}
        <div className="py-8 border-b border-white/5 text-center overflow-hidden select-none">
          <span className="font-serif text-5xl sm:text-7xl lg:text-9xl font-light tracking-[0.2em] text-white/[0.03] uppercase whitespace-nowrap">
            A A R D E  E S T A T E
          </span>
        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AARDE PROJECTS. ALL RIGHTS RESERVED.
          </div>
          <div>
            HONORED WITH AWWWARDS DESIGN SPECIFICATION
          </div>
        </div>
      </div>
    </footer>
  );
};
