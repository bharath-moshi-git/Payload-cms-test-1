import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Header } from '../components/Header'
import type { Media } from '@/payload-types'

export const revalidate = 60;

export default async function BlogsListingPage() {
  let blogs: any[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const { isEnabled: isDraftMode } = await draftMode();

    const result = await payload.find({
      collection: 'blogs',
      draft: isDraftMode,
      limit: 50,
      sort: '-createdAt',
      depth: 2,
    });
    blogs = result.docs || [];
  } catch (error) {
    console.error('Error fetching blogs in BlogsListingPage:', error);
  }

  // Fallback curated sample blogs if none present in database yet
  const fallbackBlogs = [
    {
      id: 'fallback-1',
      title: 'Architectural Harmony: Designing Luxury Villas in the Heart of Coorg',
      slug: 'architectural-harmony-coorg',
      excerpt: 'Explore how biophilic architecture and locally-sourced stone fuse modern elegance with the serene rainforest landscape.',
      date: 'MAY 24, 2026',
      readTime: '6 MIN READ',
      category: 'ARCHITECTURE',
      image: '/coorg_bg.jpg',
    },
    {
      id: 'fallback-2',
      title: 'The Art of Farm-to-Table Dining at AARDE Estate',
      slug: 'farm-to-table-dining-aarde',
      excerpt: 'Discover our organic culinary philosophy, where indigenous ingredients and heirloom coffee beans redefine mountain gastronomy.',
      date: 'MAY 18, 2026',
      readTime: '5 MIN READ',
      category: 'GASTRONOMY',
      image: '/coorg_bg.jpg',
    },
    {
      id: 'fallback-3',
      title: 'Sustainable Living: Off-Grid Renewable Energy Solutions',
      slug: 'sustainable-living-off-grid',
      excerpt: 'How micro-hydro turbines and high-efficiency solar networks supply 100% clean power to 45 luxury sanctuaries.',
      date: 'MAY 10, 2026',
      readTime: '8 MIN READ',
      category: 'SUSTAINABILITY',
      image: '/coorg_bg.jpg',
    },
    {
      id: 'fallback-4',
      title: 'Monsoon Magic: Managing Humidity and Microclimates in Luxury Real Estate',
      slug: 'monsoon-magic-microclimates',
      excerpt: 'Subterranean drainage systems and passivhaus thermal mass design engineered for heavy Western Ghats rains.',
      date: 'APRIL 28, 2026',
      readTime: '7 MIN READ',
      category: 'ENGINEERING',
      image: '/coorg_bg.jpg',
    },
    {
      id: 'fallback-5',
      title: 'Coffee Estate Stewardship: Agroforestry & Ecosystem Preservation',
      slug: 'coffee-estate-stewardship',
      excerpt: 'Balancing multi-tier canopy protection with luxury sanctuary development for complete biodiversity survival.',
      date: 'APRIL 14, 2026',
      readTime: '9 MIN READ',
      category: 'ECOLOGY',
      image: '/coorg_bg.jpg',
    },
    {
      id: 'fallback-6',
      title: 'Wellness Retreats: Designing Quiet Spaces for Meditation and Renewal',
      slug: 'wellness-retreats-quiet-spaces',
      excerpt: 'Creating secluded forest decks, thermal mineral baths, and outdoor yoga sanctuaries embedded in nature.',
      date: 'MARCH 30, 2026',
      readTime: '4 MIN READ',
      category: 'WELLNESS',
      image: '/coorg_bg.jpg',
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-[#E2C08D] selection:text-black">
      {/* Header & Hero Section */}
      <div className="relative min-h-[50vh] flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20 scale-105"
          style={{
            backgroundImage: `url('/coorg_bg.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/80 to-[#05070B] pointer-events-none z-0" />

        <Header
          logoText={'A A R D E'}
          logoSubtext={'PROJECTS'}
          headerCtaText={'Book A Stay'}
          headerCtaLink={'/contact'}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-16 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2C08D]/30 bg-[#E2C08D]/10 text-[#E2C08D] text-[11px] font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2C08D] animate-pulse" />
            <span>JOURNALS & STORIES</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-white max-w-3xl leading-tight">
            Blogs & Architectural Insights
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mt-4 font-sans leading-relaxed">
            Explore our latest thoughts on biophilic architecture, sustainable resort living, ecological preservation, and luxury hospitality in Coorg.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#05070B] border-t border-white/10 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Top Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#E2C08D]">[ ALL ARTICLES ]</span>
              <span className="text-xs font-mono text-slate-500">SHOWING {displayBlogs.length} POSTS</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              UPDATED FREQUENTLY • MANAGED VIA PAYLOAD ADMIN
            </div>
          </div>

          {/* 3 Blogs in a Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogs.map((blog: any, index: number) => {
              const imageUrl =
                (blog.mainImage && typeof blog.mainImage === 'object' && (blog.mainImage as Media).url) ||
                blog.image ||
                '/coorg_bg.jpg';

              const title = blog.title || 'Untitled Blog Post';
              const slug = blog.slug || '';
              const category =
                (blog.categories && blog.categories.length > 0 && typeof blog.categories[0] === 'object'
                  ? blog.categories[0].name
                  : blog.category) || 'INSIGHTS';
              const dateStr = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).toUpperCase()
                : blog.date || 'MAY 2026';
              const readTime = blog.readTime || '5 MIN READ';
              const excerpt =
                blog.excerpt ||
                (typeof blog.content === 'string'
                  ? blog.content.slice(0, 120) + '...'
                  : 'Discover detailed insights and architectural documentation on sustainable luxury living.');

              return (
                <Link
                  href={`/blogs/${slug}`}
                  key={blog.id || index}
                  className="group flex flex-col h-full"
                >
                  <div className="awwwards-card rounded-3xl overflow-hidden flex-1 flex flex-col justify-between border border-white/10 hover:border-[#E2C08D]/50 transition-all duration-300 group-hover:-translate-y-1">
                    
                    {/* Card Image Header */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[10px] font-mono uppercase font-bold tracking-wider rounded-full bg-black/70 backdrop-blur-md text-[#E2C08D] border border-white/15">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>{dateStr}</span>
                          <span className="text-[#E2C08D]/80">• {readTime}</span>
                        </div>

                        <h2 className="text-xl font-serif text-white group-hover:text-[#E2C08D] transition-colors leading-snug font-normal">
                          {title}
                        </h2>

                        <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      </div>

                      {/* Card Footer Link */}
                      <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-[#E2C08D]">
                        <span>READ FULL ARTICLE</span>
                        <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
