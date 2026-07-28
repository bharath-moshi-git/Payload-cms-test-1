import React from 'react';

interface FeatureItem {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
}

interface FeaturesProps {
  heading?: string | null;
  subheading?: string | null;
  items?: FeatureItem[] | null;
}

const defaultItems: FeatureItem[] = [
  {
    title: 'Tailwind CSS v4 Architecture',
    description: 'Utility-first CSS engine with zero-runtime design tokens, fluid typography, and custom micro-animations.',
    icon: '⚡',
  },
  {
    title: 'Payload 3.0 Headless CMS',
    description: 'Visual content control, custom schema collections, and real-time field synchronization for luxury brands.',
    icon: '⚙️',
  },
  {
    title: 'Next.js Dynamic Routing',
    description: 'Edge-rendered page slugs with sub-second page transitions, dynamic caching, and full SEO metadata.',
    icon: '🌐',
  },
];

const Features: React.FC<FeaturesProps> = ({
  heading = 'Architectural Capabilities',
  subheading = 'Engineered with cutting-edge web technologies to deliver an uncompromised digital experience.',
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-28 bg-[#05070B] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 02 // ARCHITECTURE & ENGINE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Architectural Capabilities'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Asymmetric Hairline Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-3xl bg-[#090D14]/70 overflow-hidden backdrop-blur-md shadow-2xl">
          {displayItems.map((item, index) => {
            const padIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="p-8 sm:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 hover:bg-white/[0.03] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-[#E2C08D] tracking-widest font-semibold">
                      {padIndex}.
                    </span>
                    <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:border-[#E2C08D]/40 group-hover:scale-110 transition-all">
                      {item.icon || '✦'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-normal text-slate-100 mb-4 group-hover:text-[#E2C08D] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-[#E2C08D] transition-colors">
                  <span>Explore Spec</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
