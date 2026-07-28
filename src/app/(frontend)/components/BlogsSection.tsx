import React from 'react';
import Link from 'next/link';
import type { Media } from '@/payload-types';

interface BlogsSectionProps {
  heading?: string | null;
  subheading?: string | null;
  selectedBlogs?: any[] | null;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({
  heading,
  subheading,
  selectedBlogs,
}) => {
  if (!selectedBlogs || selectedBlogs.length === 0) return null;

  return (
    <section className="py-28 bg-[#05070B] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 05 // FROM THE BLOG ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'From the Blog'}
            </h2>
          </div>
          {subheading && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedBlogs.map((blog: any) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id}>
              <div className="awwwards-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group">
                <div>
                  {blog.mainImage && (
                    <img
                      src={(blog.mainImage as Media).url || undefined}
                      alt={blog.title}
                      className="rounded-2xl mb-8"
                    />
                  )}
                  <h3 className="text-2xl font-serif font-normal text-slate-100 mb-4 group-hover:text-[#E2C08D] transition-colors">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
