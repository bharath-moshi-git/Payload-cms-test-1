'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Media } from '@/payload-types';

export interface GalleryImageItem {
  image?: string | Media | null;
  imageUrl?: string | null;
  isVideo?: boolean | null;
  videoUrl?: string | null;
  caption?: string | null;
}

interface GalleryProps {
  heading?: string | null;
  subheading?: string | null;
  images?: GalleryImageItem[] | null;
}

const defaultImages: GalleryImageItem[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Architecture Facade',
    isVideo: false,
  },
  {
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-41655-large.mp4',
    caption: 'Infinity Pool Drone Walkthrough',
    isVideo: true,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sunset Deck & Lounge',
    isVideo: false,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Luxury Interior Lounge',
    isVideo: false,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Master Suite Sanctuary',
    isVideo: false,
  },
];

const Gallery: React.FC<GalleryProps> = ({
  heading = 'Project Gallery',
  subheading = 'An immersive visual experience showcasing design details, premium rooms, and landscape sights.',
  images,
}) => {
  const displayImages = images && images.length > 0 ? images : defaultImages;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [spotlightItem, setSpotlightItem] = useState<GalleryImageItem | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Auto Slider Infinite Loop (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleSlideClick = (index: number) => {
    setSpotlightItem(displayImages[index]);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-28 bg-[#080B10] border-t border-white/10 relative overflow-hidden" id="gallery">
      {/* Title & Subheading */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 02 // ESTABLISHED GALLERY ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Project Gallery'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Total Width Carousel with Floating Overlay Navigation */}
      <div className="w-full relative px-0 md:px-6 max-w-7xl mx-auto select-none">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-none md:rounded-3xl border border-white/10 bg-[#0d1117] group shadow-2xl">
          
          {/* Navigation Overlay - Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 hover:bg-black hover:border-[#E2C08D]/40 text-slate-300 hover:text-[#E2C08D] flex items-center justify-center transition-all cursor-pointer font-mono shadow-lg opacity-0 group-hover:opacity-100"
            aria-label="Previous Slide"
          >
            ←
          </button>

          {/* Slider Content */}
          <div className="w-full h-full relative">
            {displayImages.map((item, index) => {
              const isActive = index === activeIndex;
              const mediaUrl =
                (item.image && typeof item.image === 'object' && item.image.url) ||
                item.imageUrl ||
                item.videoUrl ||
                '';

              return (
                <div
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out cursor-pointer ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {item.isVideo ? (
                    <div className="w-full h-full relative">
                      <video
                        src={mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-2xl text-white backdrop-blur hover:scale-110 hover:border-[#E2C08D] transition-transform">
                          ⛶
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={mediaUrl}
                        alt="Project Gallery"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-2xl text-white backdrop-blur hover:scale-110 hover:border-[#E2C08D] transition-transform">
                          ⛶
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Overlay - Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 hover:bg-black hover:border-[#E2C08D]/40 text-slate-300 hover:text-[#E2C08D] flex items-center justify-center transition-all cursor-pointer font-mono shadow-lg opacity-0 group-hover:opacity-100"
            aria-label="Next Slide"
          >
            →
          </button>
        </div>

        {/* Indicators Dots */}
        <div className="flex gap-2.5 justify-center mt-8">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'bg-[#E2C08D] w-6' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Spotlight View Lightbox Modal */}
      {spotlightItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 transition-all duration-500">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] text-[#E2C08D] tracking-widest uppercase block">
              SPOTLIGHT // FULLSCREEN VIEW
            </span>

            <div className="flex items-center gap-4">
              {!spotlightItem.isVideo && (
                <div className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                  <button onClick={handleZoomOut} className="text-slate-300 hover:text-white px-2 cursor-pointer font-mono text-sm" title="Zoom Out">-</button>
                  <span className="font-mono text-xs text-slate-300">{Math.round(zoomScale * 100)}%</span>
                  <button onClick={handleZoomIn} className="text-slate-300 hover:text-white px-2 cursor-pointer font-mono text-sm" title="Zoom In">+</button>
                  {zoomScale !== 1 && (
                    <button onClick={handleResetZoom} className="text-[10px] font-mono text-[#E2C08D] border-l border-white/10 pl-2 cursor-pointer">RESET</button>
                  )}
                </div>
              )}
              
              <button
                onClick={() => {
                  setSpotlightItem(null);
                  handleResetZoom();
                }}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-xl text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Close Spotlight"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Canvas */}
          <div
            className="flex-1 w-full flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="max-w-[95%] max-h-[80vh] flex items-center justify-center"
            >
              {spotlightItem.isVideo ? (
                <video
                  src={
                    (spotlightItem.image && typeof spotlightItem.image === 'object' && spotlightItem.image.url) ||
                    spotlightItem.imageUrl ||
                    spotlightItem.videoUrl ||
                    ''
                  }
                  autoPlay
                  controls
                  loop
                  className="rounded-2xl max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={
                    (spotlightItem.image && typeof spotlightItem.image === 'object' && spotlightItem.image.url) ||
                    spotlightItem.imageUrl ||
                    ''
                  }
                  alt="Spotlight"
                  className="rounded-2xl max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10 select-none pointer-events-none"
                />
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="w-full text-center border-t border-white/10 pt-4">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Drag inside window to pan image details.
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
