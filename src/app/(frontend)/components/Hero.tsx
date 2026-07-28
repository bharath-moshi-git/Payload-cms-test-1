import React from 'react';

interface HeroProps {
  heading?: string | null;
  headingHighlight?: string | null;
  subheading?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}

const Hero: React.FC<HeroProps> = ({
  heading = 'The Jewel of Coorg, Where Time Slows Down.',
  headingHighlight = 'Coorg,',
  subheading = 'Beyond the experience of a resort, this is a place that stays with you long after you leave, and welcomes you back with the warmth of knowing some of it belongs to you.',
  ctaText = 'Explore Residences',
  ctaLink = '#brochure',
}) => {
  // Helper to render heading with stylized champagne italic serif text
  const renderHeading = () => {
    if (!heading) return null;

    if (!headingHighlight || !heading.includes(headingHighlight)) {
      return heading;
    }

    const parts = heading.split(headingHighlight);
    return (
      <>
        {parts[0]}
        <span className="font-serif italic font-normal text-[#E2C08D] mx-2 tracking-normal underline decoration-[#E2C08D]/30 underline-offset-8">
          {headingHighlight}
        </span>
        {parts.slice(1).join(headingHighlight)}
      </>
    );
  };

  return (
    <section className="relative flex-1 flex flex-col justify-center px-6 pt-12 pb-24 z-10">
      <div className="max-w-7xl mx-auto w-full space-y-12 animate-fade-in">
        {/* Awwwards Section Index */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E2C08D] animate-ping" />
            <span>[ 01 // ARCHITECTURAL ESTATE ]</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-slate-500 tracking-widest">
            COORG, KARNATAKA — 12° 25' N / 75° 44' E
          </span>
        </div>

        {/* Oversized Editorial Display Heading */}
        <div className="max-w-6xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-slate-50 leading-[0.98] tracking-tight">
            {renderHeading()}
          </h1>
        </div>

        {/* Asymmetric Subheading & Metrics Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
          <div className="lg:col-span-7 border-l-2 border-[#E2C08D]/60 pl-6 space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed">
              {subheading}
            </p>
            {ctaText && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={ctaLink || '#brochure'}
                  className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all shadow-xl hover:scale-105 group"
                >
                  <span>{ctaText}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-mono font-medium uppercase tracking-widest text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                >
                  <span>View Specifications</span>
                </a>
              </div>
            )}
          </div>

          {/* Metric Badges Split Column */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
            <div className="space-y-1">
              <span className="block font-mono text-2xl md:text-3xl font-bold text-slate-100">150+</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">Acres Reserve</span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-2xl md:text-3xl font-bold text-[#E2C08D]">100%</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">Organic Estate</span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-2xl md:text-3xl font-bold text-slate-100">24/7</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">Butler Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
