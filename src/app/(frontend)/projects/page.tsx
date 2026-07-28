import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '../components/Header';
import Link from 'next/link';
import type { Media, Project } from '@/payload-types';

export const revalidate = 60; // Cache page for 60 seconds

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let categories: any[] = [];
  let locations: any[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch projects
    const projectRes = await payload.find({
      collection: 'projects',
      depth: 2,
      limit: 100,
    });
    projects = projectRes.docs;

    // Fetch taxonomies
    const catRes = await payload.find({
      collection: 'project-categories',
      limit: 100,
    });
    categories = catRes.docs;

    const locRes = await payload.find({
      collection: 'locations',
      limit: 100,
    });
    locations = locRes.docs;
  } catch (error) {
    console.error('Error fetching projects or taxonomies:', error);
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      {/* Header Container */}
      <Header
        logoText="A A R D E"
        logoSubtext="ESTATES"
        headerCtaText="Get In Touch"
        headerCtaLink="/contact"
      />

      {/* Directory Title */}
      <section className="pt-36 pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E2C08D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E2C08D] uppercase block">
            [ DIRECTORY & COLLECTIONS ]
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-slate-50 tracking-tight max-w-3xl">
            Signature Architectural Estates & Residences.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Browse our curated catalog of ultra-luxury resorts, private villas, and organic plantation residencies across select geographic zones.
          </p>
        </div>
      </section>

      {/* Taxonomies Indicator / Quick Filter */}
      <section className="py-8 bg-[#080B10] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
              Filter Categories:
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs bg-[#E2C08D] text-black font-semibold">
              All ({projects.length})
            </span>
            {categories.map((cat: any) => (
              <span key={cat.id} className="px-4 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 hover:border-[#E2C08D]/40 cursor-pointer text-slate-300 transition-colors">
                {cat.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Locations:</span>
            <div className="flex gap-2">
              {locations.map((loc: any) => (
                <span key={loc.id} className="font-mono text-xs text-[#E2C08D] uppercase tracking-wider bg-white/5 px-3 py-1 rounded">
                  {loc.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-[#05070B] flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl max-w-2xl mx-auto space-y-4">
              <span className="text-4xl block">🏡</span>
              <h3 className="text-xl font-serif text-slate-200">No Projects Found</h3>
              <p className="text-slate-400 text-sm">
                Register projects in your Payload Admin panel to showcase luxury residences here.
              </p>
              <div className="pt-4">
                <a
                  href="/admin/collections/projects"
                  className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#E2C08D] rounded-full hover:bg-[#F4D068] transition-colors"
                >
                  Go to Payload Admin
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => {
                const coverUrl =
                  (proj.heroImage && typeof proj.heroImage === 'object' && (proj.heroImage as Media).url) ||
                  proj.heroImageUrl ||
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

                const projectLocation =
                  proj.location && typeof proj.location === 'object'
                    ? (proj.location as any).name
                    : 'Exclusive Zone';

                const projectCats =
                  proj.category && Array.isArray(proj.category)
                    ? proj.category.map((c: any) => c.name).join(', ')
                    : '';

                return (
                  <Link href={`/projects/${proj.slug}`} key={proj.id} className="group">
                    <div className="awwwards-card rounded-3xl overflow-hidden flex flex-col justify-between h-full hover:scale-[1.01] transition-transform">
                      {/* Image cover */}
                      <div className="aspect-[16/10] overflow-hidden relative border-b border-white/10">
                        <img
                          src={coverUrl}
                          alt={proj.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 bg-[#05070B]/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-[#E2C08D]">
                          {proj.price || 'Contact for Price'}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            <span>{projectLocation}</span>
                            <span>•</span>
                            <span className="text-[#E2C08D]">{projectCats}</span>
                          </div>
                          <h3 className="text-2xl font-serif text-slate-100 font-normal group-hover:text-[#E2C08D] transition-colors leading-tight">
                            {proj.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-3 line-clamp-3 leading-relaxed">
                            {proj.description || 'No overview provided.'}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-300 group-hover:text-[#E2C08D] transition-colors">
                          <span>Explore Residence</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
