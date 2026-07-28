import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Hero from './components/Hero';
import Features from './components/Features';
import { Header } from './components/Header';
import { ServicesAmenities } from './components/ServicesAmenities';
import { Testimonials } from './components/Testimonials';
import { BlogsSection } from './components/BlogsSection';
import { CtaSection } from './components/CtaSection';

export const revalidate = 60; // Cache page for 60 seconds

export default async function HomePage() {
  let homePageDoc: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'home-page' as any,
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      homePageDoc = result.docs[0];
    }
  } catch (error) {
    console.error('Error fetching homepage schema from Payload:', error);
  }

  const header = homePageDoc?.header;
  const hero = homePageDoc?.hero;
  const features = homePageDoc?.features;
  const services = homePageDoc?.services;
  const testimonials = homePageDoc?.testimonials;
  const cta = homePageDoc?.cta;
  const content = homePageDoc?.content;
  const blogsSection = homePageDoc?.blogs;

  const fallbackImageUrl =
    (typeof hero?.fallbackImage === 'object' && hero?.fallbackImage?.url) ||
    hero?.fallbackImageUrl ||
    '/coorg_bg.jpg';

  const bodyText = content?.bodyContent;

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      {/* Hero Container */}
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20 scale-105"
          style={{
            backgroundImage: `url(${fallbackImageUrl})`,
          }}
        />

        {/* Sophisticated Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/80 to-[#05070B] pointer-events-none z-0" />

        {/* Floating Header */}
        <Header
          logoText={header?.logoText || 'A A R D E'}
          logoSubtext={header?.logoSubtext || 'PROJECTS'}
          headerCtaText={header?.headerCtaText || 'Book A Stay'}
          headerCtaLink={header?.headerCtaLink || '/contact'}
        />

        {/* Hero Section */}
        <Hero
          heading={hero?.heading || 'The Jewel of Coorg, Where Time Slows Down.'}
          headingHighlight={hero?.headingHighlight || 'Coorg,'}
          subheading={
            hero?.subheading ||
            'Beyond the experience of a resort, this is a place that stays with you long after you leave, and welcomes you back with the warmth of knowing some of it belongs to you.'
          }
          ctaText={hero?.ctaText || 'Explore Residences'}
          ctaLink={hero?.ctaLink || '#brochure'}
        />
      </div>

      {/* Body Content Section */}
      {bodyText && (
        <section className="py-24 bg-[#080B10] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-slate-300 whitespace-pre-line text-xl leading-relaxed font-serif font-light">
            {bodyText}
          </div>
        </section>
      )}

      {/* Section 2: Features Section */}
      <Features
        heading={features?.heading || 'Architectural Capabilities'}
        subheading={features?.subheading}
        items={features?.items}
      />

      {/* Section 3: Services & Amenities (Awwwards Bento Layout) */}
      {(services?.items?.length > 0 || services?.heading) && (
        <ServicesAmenities
          heading={services?.heading}
          subheading={services?.subheading}
          items={services?.items}
        />
      )}

      {/* Section 4: Testimonials Section */}
      {(testimonials?.items?.length > 0 || testimonials?.heading) && (
        <Testimonials
          heading={testimonials?.heading}
          subheading={testimonials?.subheading}
          items={testimonials?.items}
        />
      )}

      {/* Blogs Section */}
      {blogsSection?.selectedBlogs?.length > 0 && (
        <BlogsSection
          heading={blogsSection?.heading}
          subheading={blogsSection?.subheading}
          selectedBlogs={blogsSection?.selectedBlogs}
        />
      )}

      {/* Section 5: Call To Action & Contact Section */}
      <CtaSection
        heading={cta?.heading}
        subheading={cta?.subheading}
        buttonText={cta?.buttonText}
        buttonLink={cta?.buttonLink}
        contactEmail={cta?.contactEmail}
        contactPhone={cta?.contactPhone}
      />
    </div>
  );
}
