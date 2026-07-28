import React from 'react';

export interface AmenityItem {
  title: string;
  description?: string | null;
  icon?: string | null;
  id?: string | null;
}

interface AmenitiesProps {
  heading?: string | null;
  subheading?: string | null;
  items?: AmenityItem[] | null;
}

const defaultAmenities: AmenityItem[] = [
  {
    title: 'Infinity Sky Pool',
    description: 'A heated infinity-edge swimming pool overlooking the panoramic coffee estate hills.',
    icon: '🏊‍♂️',
  },
  {
    title: 'Bespoke Wellness Spa',
    description: 'Traditional Ayurvedic and modern therapy rooms staffed by certified wellness practitioners.',
    icon: '🌿',
  },
  {
    title: 'Private Helipad',
    description: 'On-site premium helicopter landing zone with prior ATC clearance services.',
    icon: '🚁',
  },
  {
    title: 'Gourmet Organic Bistro',
    description: 'Farm-to-table fine dining showcasing seasonal organic produce harvested on-site.',
    icon: '🍽️',
  },
];

const Amenities: React.FC<AmenitiesProps> = ({
  heading = 'Curated Estate Amenities',
  subheading = 'A compilation of absolute premium utilities crafted to enhance your daily lifestyle.',
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultAmenities;

  return (
    <section className="py-28 bg-[#05070B] border-t border-white/10 relative overflow-hidden" id="amenities">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 01 // EXCLUSIVE AMENITIES ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Curated Estate Amenities'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.map((item, index) => {
            const padIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="awwwards-card rounded-3xl p-8 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#E2C08D]/40 transition-all">
                      {item.icon || '✨'}
                    </span>
                    <span className="font-mono text-xs text-slate-500 tracking-widest font-semibold">
                      AMENITY /{padIndex}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-slate-100 mb-4 group-hover:text-[#E2C08D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
