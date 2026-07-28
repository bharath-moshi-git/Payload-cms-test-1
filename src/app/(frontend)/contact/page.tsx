import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { ContactForm } from '../components/ContactForm';
import { ContactInfo } from '../components/ContactInfo';

export const revalidate = 60;

export default async function ContactPage() {
  let contactDoc: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'contact-page' as any,
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      contactDoc = result.docs[0];
    }
  } catch (error) {
    console.error('Error fetching contact page schema from Payload:', error);
  }

  const header = contactDoc?.header;
  const hero = contactDoc?.hero;
  const info = contactDoc?.contactInfo;
  const formSettings = contactDoc?.formSettings;

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
          heading={hero?.heading || 'Get In Touch With Us'}
          headingHighlight={hero?.headingHighlight || 'Touch'}
          subheading={
            hero?.subheading ||
            'Whether you have questions about our luxury villa projects or want to reserve your stay, our team is here to assist you.'
          }
          ctaText="View Locations"
          ctaLink="#details"
        />
      </div>

      {/* Main Content: Info & Interactive Form */}
      <section className="py-28 bg-[#05070B] border-t border-white/10" id="details">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details */}
          <ContactInfo
            heading={info?.heading}
            address={info?.address}
            email={info?.email}
            phone={info?.phone}
            workingHours={info?.workingHours}
          />

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm
              formHeading={formSettings?.formHeading}
              formSubheading={formSettings?.formSubheading}
              submitButtonText={formSettings?.submitButtonText}
              successMessage={formSettings?.successMessage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
