import React from 'react';

export interface ServiceItem {
  title: string;
  description?: string | null;
  icon?: string | null;
}

interface ServicesAmenitiesProps {
  heading?: string | null;
  subheading?: string | null;
  items?: ServiceItem[] | null;
}

const defaultItems: ServiceItem[] = [
  {
    title: 'Private Villa Retreats',
    description:
      'Spacious private sanctuaries featuring luxury interiors, private infinity pools, and breathtaking plantation views.',
    icon: '🏡',
  },
  {
    title: 'Organic Farm Dining',
    description:
      'Farm-to-table culinary experiences using fresh ingredients harvested daily from Coorg estate farms.',
    icon: '☕',
  },
  {
    title: 'Wellness & Nature Walks',
    description:
      'Rejuvenate with serene guided coffee plantation trails and bespoke holistic wellness treatments.',
    icon: '🌿',
  },
];

export const ServicesAmenities: React.FC<ServicesAmenitiesProps> = ({
  heading,
  subheading,
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-28 bg-[#05070B] border-t border-white/10 relative" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 03 // AMENITIES & RESIDENCES ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Curated Experiences & Amenities'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item, idx) => {
            const pad = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={idx}
                className="awwwards-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#E2C08D]/40 transition-all">
                      {item.icon || '✦'}
                    </span>
                    <span className="font-mono text-xs text-slate-500 tracking-widest font-semibold">
                      SPEC /{pad}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-normal text-slate-100 mb-4 group-hover:text-[#E2C08D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
