import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { CareersForm } from '../components/CareersForm';
import { CareersOpenings } from '../components/CareersOpenings';

export const revalidate = 60;

export default async function CareersPage() {
  let careersDoc: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'careers-page' as any,
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      careersDoc = result.docs[0];
    }
  } catch (error) {
    console.error('Error fetching careers page schema from Payload:', error);
  }

  const header = careersDoc?.header;
  const hero = careersDoc?.hero;
  const positions = careersDoc?.positions;
  const formSettings = careersDoc?.formSettings;

  const fallbackImageUrl = hero?.fallbackImageUrl || '/coorg_bg.jpg';

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      {/* Header & Hero Section */}
      <div className="relative min-h-[65vh] flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20 scale-105"
          style={{
            backgroundImage: `url(${fallbackImageUrl})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/80 to-[#05070B] pointer-events-none z-0" />

        <Header
          logoText={header?.logoText || 'A A R D E'}
          logoSubtext={header?.logoSubtext || 'PROJECTS'}
          headerCtaText={header?.headerCtaText || 'Book A Stay'}
          headerCtaLink={header?.headerCtaLink || '/contact'}
        />

        <Hero
          heading={hero?.heading || 'Build Your Career With Us'}
          headingHighlight={hero?.headingHighlight || 'Career'}
          subheading={
            hero?.subheading ||
            'Join our passionate team shaping luxury hospitality, architectural excellence, and sustainable resort development in Coorg.'
          }
          ctaText="Explore Openings"
          ctaLink="#openings"
        />
      </div>

      {/* Section: Current Openings & Benefits */}
      <section className="py-28 bg-[#05070B] border-t border-white/10" id="openings">
        <div className="max-w-7xl mx-auto px-6">
          <CareersOpenings
            heading={positions?.sectionHeading}
            subheading={positions?.sectionSubheading}
            items={positions?.items}
          />

          {/* Careers Application Form */}
          <div className="max-w-4xl mx-auto">
            <CareersForm
              formHeading={formSettings?.formHeading}
              formSubheading={formSettings?.formSubheading}
              submitButtonText={formSettings?.submitButtonText}
              successMessage={formSettings?.successMessage}
              positions={positions?.items}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
