import React from 'react';

export interface ReviewItem {
  author: string;
  role?: string | null;
  quote: string;
  rating?: number | null;
}

interface ReviewsProps {
  heading?: string | null;
  subheading?: string | null;
  items?: ReviewItem[] | null;
}

const defaultReviews: ReviewItem[] = [
  {
    author: 'Alistair & Evelyn Vane',
    role: 'Villa 14 Owner',
    quote: 'An exceptional architectural marvel. Waking up to the morning mist over the coffee hills with total privacy and luxury has redefined our idea of home.',
    rating: 5,
  },
  {
    author: 'Vikram Aditya',
    role: 'Real Estate Investor',
    quote: 'The level of dedication to design detail and sustainability is what drew me in. Payload makes updating and managing my investments dynamic.',
    rating: 5,
  },
];

const Reviews: React.FC<ReviewsProps> = ({
  heading = 'Resident Reviews',
  subheading = 'Hear directly from our homeowners and community members about their experiences.',
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultReviews;

  return (
    <section className="py-28 bg-[#05070B] border-t border-white/10 relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 03 // TESTIMONIALS & REVIEWS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Resident Reviews'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="awwwards-card rounded-3xl p-8 sm:p-12 flex flex-col justify-between h-full relative"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <span key={i} className="text-[#E2C08D] text-lg">★</span>
                  ))}
                </div>

                <span className="text-6xl text-[#E2C08D]/25 font-serif leading-none block mb-2 -mt-4">
                  “
                </span>
                <p className="text-slate-200 text-lg sm:text-xl font-serif font-light italic leading-relaxed mb-8">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-semibold text-slate-100 text-sm">{item.author}</h4>
                  {item.role && (
                    <span className="font-mono text-[10px] text-[#E2C08D] uppercase tracking-widest mt-1 block">
                      {item.role}
                    </span>
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

export default Reviews;
