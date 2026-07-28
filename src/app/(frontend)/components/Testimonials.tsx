import React from 'react';

export interface TestimonialItem {
  quote: string;
  author: string;
  location?: string | null;
}

interface TestimonialsProps {
  heading?: string | null;
  subheading?: string | null;
  items?: TestimonialItem[] | null;
}

const defaultItems: TestimonialItem[] = [
  {
    quote:
      'An unforgettable escape in the heart of nature. The craftsmanship, architectural detail, and quiet serenity are truly unmatched.',
    author: 'Rohan & Priya Sharma',
    location: 'Bangalore, India',
  },
  {
    quote:
      'Managing and customizing our estate content visually through the Payload Admin system makes site operations completely seamless.',
    author: 'Resort Operations Team',
    location: 'Coorg Estate',
  },
];

export const Testimonials: React.FC<TestimonialsProps> = ({
  heading,
  subheading,
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-28 bg-[#080B10] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 04 // TESTIMONIALS & ENDORSEMENTS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Guest & Owner Experiences'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="awwwards-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <span className="text-6xl text-[#E2C08D]/30 font-serif leading-none block mb-4">
                  “
                </span>
                <p className="text-lg italic leading-relaxed text-slate-200 mb-8 font-serif">
                  {item.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-sans font-semibold text-slate-100 text-sm">{item.author}</div>
                  {item.location && (
                    <div className="font-mono text-xs text-[#E2C08D] mt-1 uppercase tracking-wider">
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
