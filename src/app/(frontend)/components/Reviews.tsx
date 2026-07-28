'use client';

import React, { useState, useEffect } from 'react';

export interface ReviewItem {
  author: string;
  role?: string | null;
  quote: string;
  rating?: number | null;
  id?: string | null;
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
  {
    author: 'Elena Rostova',
    role: 'Boutique Travel Writer',
    quote: 'A sanctuary in the truest sense. The integration of organic plantation farming with five-star luxury amenities is executed flawlessly.',
    rating: 5,
  },
  {
    author: 'Marcus Aurelius',
    role: 'Coorg Resident',
    quote: 'Sustainable luxury done right. The architecture respects the native landscape while providing unmatched premium comfort.',
    rating: 5,
  },
  {
    author: 'Siddharth Mehta',
    role: 'Estate Owner',
    quote: 'A majestic experience. From the private helipad to the Ayurvedic spa, every single detail has been crafted with absolute precision.',
    rating: 5,
  },
];

const Reviews: React.FC<ReviewsProps> = ({
  heading = 'Resident Reviews',
  subheading = 'Hear directly from our homeowners and community members about their experiences.',
  items,
}) => {
  const displayItems = items && items.length > 0 ? items : defaultReviews;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play infinite slider (every 3.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < displayItems.length - 1 ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, [displayItems.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : displayItems.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < displayItems.length - 1 ? prev + 1 : 0));
  };

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
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {subheading && (
              <p className="text-slate-400 text-sm font-sans max-w-xs leading-relaxed">
                {subheading}
              </p>
            )}
            {/* Slider Navigation */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border flex items-center justify-center font-mono transition-all text-sm border-white/10 hover:border-[#E2C08D]/40 text-slate-300 hover:text-[#E2C08D]"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border flex items-center justify-center font-mono transition-all text-sm border-white/10 hover:border-[#E2C08D]/40 text-slate-300 hover:text-[#E2C08D]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Overlapping Slider Container */}
        <div className="w-full overflow-hidden">
          <div
            className="flex flex-nowrap min-w-max gap-5 transition-transform duration-500 ease-out pb-8"
            style={{
              transform: `translateX(-${activeIndex * 430}px)`, // 410px width + 20px gap = 430px step size
            }}
          >
            {displayItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`awwwards-card rounded-3xl p-8 sm:p-12 flex flex-col justify-between shrink-0 relative transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-[410px] h-[360px] scale-100 opacity-100 border-[#E2C08D]/60 shadow-2xl'
                      : 'w-[410px] h-[360px] scale-95 opacity-40 border-white/5 hover:opacity-75 translate-y-2'
                  }`}
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <span key={i} className="text-[#E2C08D] text-sm">★</span>
                        ))}
                      </div>

                      <span className="text-4xl text-[#E2C08D]/25 font-serif leading-none block mb-1">
                        “
                      </span>
                      <p className="text-slate-200 text-sm sm:text-base font-serif font-light italic leading-relaxed line-clamp-4">
                        {item.quote}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-sans font-semibold text-slate-100 text-xs">{item.author}</h4>
                        {item.role && (
                          <span className="font-mono text-[9px] text-[#E2C08D] uppercase tracking-widest mt-0.5 block">
                            {item.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
