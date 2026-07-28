import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import Hero from '../components/Hero';
import { Header } from '../components/Header';
import Features from '../components/Features';

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  let pageData: any = null;
  let aboutPageDoc: any = null;

  try {
    const payload = await getPayload({ config: configPromise });

    if (slug === 'about' || slug === 'about-us') {
      const res = await payload.find({
        collection: 'about-page' as any,
        depth: 2,
        limit: 1,
      });
      if (res.docs && res.docs.length > 0) {
        aboutPageDoc = res.docs[0];
      }
    }

    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      pageData = result.docs[0];
    }
  } catch (error) {
    console.error(`Error fetching page [${slug}] from Payload:`, error);
  }

  const pageTitles: Record<string, { heading: string; subheading: string; body: string }> = {
    about: {
      heading: 'About AARDE Projects',
      subheading: 'Learn more about our mission, vision, and sustainable luxury resort estate in Coorg.',
      body: 'Welcome to AARDE Projects. We blend world-class architectural craftsmanship with ecological preservation in the heart of Coorg. You can customize this content dynamically from Payload CMS Admin!',
    },
    'about-us': {
      heading: 'About AARDE Projects',
      subheading: 'Learn more about our mission, vision, and sustainable luxury resort estate in Coorg.',
      body: 'Welcome to AARDE Projects. We blend world-class architectural craftsmanship with ecological preservation in the heart of Coorg. You can customize this content dynamically from Payload CMS Admin!',
    },
    services: {
      heading: 'Our Services',
      subheading: 'Discover our luxury estate offerings and hospitality capabilities.',
      body: 'This is the Services page. You can customize this heading, subheading, and content dynamically from Payload CMS Admin!',
    },
  };

  const fallback = pageTitles[slug];

  if (!pageData && !aboutPageDoc && !fallback) {
    notFound();
  }

  const header = aboutPageDoc?.header || pageData?.header;
  const hero = aboutPageDoc?.hero || pageData?.hero;
  const story = aboutPageDoc?.story;
  const values = aboutPageDoc?.values;

  const bgImageUrl =
    (typeof hero?.fallbackImage === 'object' && hero?.fallbackImage?.url) ||
    hero?.fallbackImageUrl ||
    pageData?.bgImageUrl ||
    '/coorg_bg.jpg';

  const bodyText = story?.bodyContent || pageData?.bodyContent || fallback?.body;

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      <div className="relative min-h-[65vh] flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20 scale-105"
          style={{
            backgroundImage: `url(${bgImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/80 to-[#05070B] pointer-events-none" />

        <Header
          logoText={header?.logoText || pageData?.logoText || 'A A R D E'}
          logoSubtext={header?.logoSubtext || pageData?.logoSubtext || 'PROJECTS'}
          headerCtaText={header?.headerCtaText || pageData?.headerCtaText || 'Book A Stay'}
          headerCtaLink={header?.headerCtaLink || pageData?.headerCtaLink || '/contact'}
        />

        <Hero
          heading={hero?.heading || pageData?.heroHeading || fallback?.heading || slug.toUpperCase()}
          headingHighlight={hero?.headingHighlight || pageData?.heroHeadingHighlight}
          subheading={
            hero?.subheading ||
            pageData?.heroSubheading ||
            fallback?.subheading ||
            `Dynamic page content for /${slug}`
          }
          ctaText={hero?.ctaText || pageData?.heroCtaText || 'Contact Us'}
          ctaLink={hero?.ctaLink || pageData?.heroCtaLink || '/contact'}
        />
      </div>

      {bodyText && (
        <section className="py-28 bg-[#05070B] border-t border-white/10 flex-1">
          <div className="max-w-4xl mx-auto px-6">
            {story?.heading && (
              <h2 className="text-4xl font-serif font-light text-slate-100 mb-8">{story.heading}</h2>
            )}
            <div className="awwwards-glass rounded-3xl p-8 sm:p-12 border border-white/10 text-slate-300 whitespace-pre-line text-lg leading-relaxed font-sans shadow-2xl">
              {bodyText}
            </div>
          </div>
        </section>
      )}

      {(values?.items || pageData?.featureItems || pageData?.featuresHeading) && (
        <Features
          heading={values?.heading || pageData?.featuresHeading || 'Our Core Values'}
          subheading={pageData?.featuresSubheading}
          items={values?.items || pageData?.featureItems}
        />
      )}
    </div>
  );
}
