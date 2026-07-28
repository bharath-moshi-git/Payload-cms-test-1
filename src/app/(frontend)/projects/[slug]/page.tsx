import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import Hero from '../../components/Hero';
import Amenities from '../../components/Amenities';
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import LocationMap from '../../components/LocationMap';
import type { Media, Project } from '@/payload-types';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60; // Cache page for 60 seconds

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project: Project | null = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      project = result.docs[0];
    }
  } catch (error) {
    console.error(`Error fetching project details [${slug}]:`, error);
  }

  if (!project) {
    notFound();
  }

  // Cover image fallback sequence
  const coverUrl =
    (project.heroImage && typeof project.heroImage === 'object' && (project.heroImage as Media).url) ||
    project.heroImageUrl ||
    '/coorg_bg.jpg';

  const categoryNames =
    project.category && Array.isArray(project.category)
      ? project.category.map((cat: any) => cat.name).join(', ')
      : 'Luxury Estate';

  const locationName =
    project.location && typeof project.location === 'object'
      ? (project.location as any).name
      : 'Exclusive Location';

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      {/* Hero Header container */}
      <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-25 scale-105"
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/85 to-[#05070B] pointer-events-none" />

        <Header
          logoText="A A R D E"
          logoSubtext={locationName.toUpperCase()}
          headerCtaText="Brochure"
          headerCtaLink="#gallery"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full flex-grow flex flex-col justify-end space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[#E2C08D] bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
              {categoryNames}
            </span>
            <span className="font-mono text-xs tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
              {locationName}
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-serif font-light text-slate-50 tracking-tight leading-[1.1] max-w-4xl">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div className="lg:col-span-2 space-y-4">
              <span className="font-mono text-xs text-[#E2C08D] uppercase tracking-wider block">
                PROJECT OVERVIEW
              </span>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {project.description || 'Welcome to this premium architectural masterpiece.'}
              </p>
            </div>

            <div className="awwwards-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-center space-y-2 h-fit">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                VALUATION SPEC
              </span>
              <div className="text-2xl sm:text-3xl font-serif text-[#E2C08D] font-normal">
                {project.price || 'Price on request'}
              </div>
              <span className="font-sans text-xs text-slate-400">Exclusive of tax & registrations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections rendered dynamically using database values */}
      {/* Amenities Section */}
      <Amenities
        heading={project.amenities?.heading}
        subheading={project.amenities?.subheading}
        items={project.amenities?.items}
      />

      {/* Gallery Section */}
      <Gallery
        heading={project.gallery?.heading}
        subheading={project.gallery?.subheading}
        images={project.gallery?.images}
      />

      {/* Reviews Section */}
      <Reviews
        heading={project.reviews?.heading}
        subheading={project.reviews?.subheading}
        items={project.reviews?.items}
      />

      {/* Location Map Section */}
      <LocationMap
        heading={project.locationMap?.heading}
        address={project.locationMap?.address}
        mapUrl={project.locationMap?.mapUrl}
        latitude={project.locationMap?.latitude}
        longitude={project.locationMap?.longitude}
        nearbyPlaces={project.locationMap?.nearbyPlaces}
      />
    </div>
  );
}
