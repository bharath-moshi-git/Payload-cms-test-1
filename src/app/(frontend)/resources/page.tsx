import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Header } from '../components/Header'

export const revalidate = 60;

export default async function ResourcesPage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const { isEnabled: isDraftMode } = await draftMode()

  let blogs: any[] = [];
  try {
    const res = await payload.find({
      collection: 'blogs',
      draft: isDraftMode,
      limit: 20,
      sort: '-createdAt',
    })
    blogs = res.docs || [];
  } catch (err) {
    console.error('Error fetching blogs for resources page:', err);
  }

  // Pre-configured Case Studies & Featured Articles
  const caseStudies = [
    {
      id: 'cs-1',
      type: 'CASE STUDY',
      typeColor: 'text-[#E2C08D] border-[#E2C08D]/30 bg-[#E2C08D]/10',
      title: 'Biophilic Design in High-Humidity Microclimates: The Coorg Villa Model',
      description: 'An architectural breakdown of moisture regulation, thermal mass calculation, and natural airflow in private luxury residences built amidst dense evergreen forest canopies.',
      category: 'Sustainable Architecture',
      readTime: '8 min read',
      date: 'MAY 2026',
      image: '/coorg_bg.jpg',
      author: 'Dr. Aris Thorne, Lead Architect',
      link: '#',
    },
    {
      id: 'cs-2',
      type: 'CASE STUDY',
      typeColor: 'text-[#E2C08D] border-[#E2C08D]/30 bg-[#E2C08D]/10',
      title: 'Zero-Grid Power Systems: Off-Grid Solar & Hydro Microturbines at AARDE',
      description: 'How AARDE Estate maintains 100% renewable energy self-sufficiency across 45 private luxury villas using micro-hydro and smart battery storage.',
      category: 'Clean Tech & Energy',
      readTime: '12 min read',
      date: 'APRIL 2026',
      image: '/coorg_bg.jpg',
      author: 'Elena Vance, Energy Systems Lead',
      link: '#',
    },
  ];

  const defaultArticles = [
    {
      id: 'art-1',
      type: 'ARTICLE',
      typeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      title: 'Preserving Old-Growth Coffee Plantations Through Minimal Intervention',
      description: 'Balancing luxury real estate development with ancient agroforestry ecosystems and soil biodiversity in the Western Ghats.',
      category: 'Ecology & Estate',
      readTime: '6 min read',
      date: 'MARCH 2026',
      image: '/coorg_bg.jpg',
      link: '#',
    },
    {
      id: 'art-2',
      type: 'ARTICLE',
      typeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      title: 'Material Honesty: Sourcing Local Granite & Reclaimed Teak for Coorg Sanctuaries',
      description: 'Why native stone and carbon-neutral timber outshine imported synthetics in longevity, luxury appeal, and environmental stewardship.',
      category: 'Design Philosophy',
      readTime: '5 min read',
      date: 'FEBRUARY 2026',
      image: '/coorg_bg.jpg',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-[#040609] text-slate-100 flex flex-col font-sans selection:bg-[#E2C08D] selection:text-black">
      {/* Hero Header Section */}
      <div className="relative min-h-[55vh] flex flex-col justify-between overflow-hidden bg-[#040609]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20 scale-105"
          style={{
            backgroundImage: `url('/coorg_bg.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040609]/90 via-[#040609]/80 to-[#040609] pointer-events-none" />

        <Header
          logoText={'A A R D E'}
          logoSubtext={'PROJECTS'}
          headerCtaText={'Book A Stay'}
          headerCtaLink={'/contact'}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2C08D]/30 bg-[#E2C08D]/10 text-[#E2C08D] text-[11px] font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2C08D] animate-pulse" />
            <span>KNOWLEDGE & INSIGHTS HUB</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-white max-w-4xl leading-[1.15]">
            Case Studies, Research & Technical Documentation
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mt-5 font-sans leading-relaxed">
            Discover in-depth case studies on sustainable luxury, estate design blueprints, ecological reports, and download complete technical documentation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/api/download-docs"
              download="AARDE_Projects_Technical_Documentation.md"
              className="inline-flex items-center gap-3 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span>⬇ Download Technical Documentation (.md)</span>
            </a>
            <a
              href="/TECHNICAL_DOCUMENTATION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all hover:text-white"
            >
              <span>📄 View Raw Markdown</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#040609] border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

          {/* Section 1: Featured Case Study Spotlight */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#E2C08D]">[ FEATURED CASE STUDY ]</span>
              </div>
              <span className="text-xs font-mono text-slate-500">EXPERT INSIGHTS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090D14] border border-white/10 rounded-3xl overflow-hidden hover:border-[#E2C08D]/40 transition-all duration-300 group shadow-2xl">
              <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                  style={{ backgroundImage: `url('/coorg_bg.jpg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#090D14]/40 to-[#090D14] hidden lg:block" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full bg-[#E2C08D] text-black font-bold">
                    PRIMARY CASE STUDY
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="text-[#E2C08D]">ARCHITECTURAL RESEARCH</span>
                    <span>•</span>
                    <span>14 MIN READ</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#E2C08D] transition-colors leading-tight">
                    Integrating Passivhaus Standard with Monsoon Rain Harvesting in Coorg
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Detailed engineering report examining thermal insulation efficiency, subterranean water catchments, and humidity management across 12,000 sq ft residential estate modules.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-500">
                    BY AARDE RESEARCH & LABS
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E2C08D] group-hover:translate-x-1 transition-transform flex items-center gap-2">
                    READ FULL STUDY →
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Architectural Case Studies */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif text-white flex items-center gap-3">
                <span className="text-xs font-mono text-[#E2C08D]">[ 01 ]</span>
                <span>Case Studies</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">2 REPORTS AVAILABLE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#080B10] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#E2C08D]/40 transition-all duration-300 space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${item.typeColor}`}>
                        {item.type}
                      </span>
                      <span className="text-slate-500">{item.readTime}</span>
                    </div>

                    <h3 className="text-xl font-serif text-white group-hover:text-[#E2C08D] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{item.author}</span>
                    <span className="text-[#E2C08D] font-bold group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Blogs & Articles (Fetched from CMS & Curated) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif text-white flex items-center gap-3">
                <span className="text-xs font-mono text-[#E2C08D]">[ 02 ]</span>
                <span>Blogs & Articles</span>
              </h2>
              <Link href="/blogs" className="text-xs font-mono text-[#E2C08D] hover:underline">
                VIEW ALL BLOGS ({blogs.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.length > 0
                ? blogs.map((blog: any) => (
                    <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group flex flex-col">
                      <div className="bg-[#080B10] border border-white/10 rounded-2xl overflow-hidden flex-1 flex flex-col justify-between hover:border-[#E2C08D]/40 transition-all duration-300">
                        {blog.mainImage && typeof blog.mainImage === 'object' && blog.mainImage.url && (
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={blog.mainImage.url}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full bg-black/60 backdrop-blur-md text-[#E2C08D] border border-white/10">
                                BLOG
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                            <h3 className="text-lg font-serif text-white group-hover:text-[#E2C08D] transition-colors leading-snug">
                              {blog.title}
                            </h3>
                          </div>
                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E2C08D]">
                            <span>Read Article</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                : defaultArticles.map((art) => (
                    <div
                      key={art.id}
                      className="bg-[#080B10] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E2C08D]/40 transition-all duration-300 space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${art.typeColor}`}>
                            {art.type}
                          </span>
                          <span className="text-slate-500">{art.readTime}</span>
                        </div>
                        <h3 className="text-lg font-serif text-white group-hover:text-[#E2C08D] transition-colors leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {art.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E2C08D]">
                        <span>{art.category}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          {/* Section 4: Newsletter & Research Access CTA */}
          <section className="bg-gradient-to-r from-[#080C14] via-[#0E1524] to-[#080C14] border border-[#E2C08D]/20 rounded-3xl p-8 md:p-14 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E2C08D]/10 via-transparent to-transparent pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2C08D]/30 bg-[#E2C08D]/10 text-[#E2C08D] text-[10px] font-mono tracking-widest uppercase">
              <span>AARDE RESEARCH DISPATCH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white max-w-2xl mx-auto">
              Subscribe to Quarterly Architectural & Ecological Case Studies
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Receive curated whitepapers on passive energy design, Western Ghats ecology preservation, and private estate luxury developments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Enter your professional email..."
                className="px-5 py-3 rounded-full bg-[#05070B] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E2C08D] flex-1 font-mono"
              />
              <button className="px-6 py-3 rounded-full bg-[#E2C08D] hover:bg-[#F4D068] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
}
