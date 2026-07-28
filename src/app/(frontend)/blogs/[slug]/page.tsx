import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Header } from '../../components/Header'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import RichText from '../../components/RichText'

type BlogPageProps = {
  params: Promise<{
    slug: string
  }>
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params
  const payload = await getPayload({
    config: configPromise,
  })

  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: isDraftMode,
    limit: 1,
    depth: 2,
  })

  const blog = result.docs[0]

  if (!blog) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans">
      <div className="relative flex flex-col justify-between overflow-hidden bg-[#05070B]">
        <Header
          logoText={'A A R D E'}
          logoSubtext={'PROJECTS'}
          headerCtaText={'Book A Stay'}
          headerCtaLink={'/contact'}
        />

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-8">{blog.title}</h1>
          {blog.mainImage && typeof blog.mainImage === 'object' && (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={(blog.mainImage as Media).url || ''}
                alt={(blog.mainImage as Media).alt || blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#05070B] border-t border-white/10 flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="awwwards-glass rounded-3xl p-8 sm:p-12 border border-white/10 text-slate-300 whitespace-pre-line text-lg leading-relaxed font-sans shadow-2xl">
            <RichText content={blog.content} />
          </div>

          {blog.relatedBlogs && blog.relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold">Related Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {blog.relatedBlogs.map((relatedBlog) => {
                  if (typeof relatedBlog !== 'object' || relatedBlog === null) return null
                  return (
                    <Link href={`/blogs/${relatedBlog.slug}`} key={relatedBlog.id}>
                      <div className="awwwards-glass rounded-3xl p-8 sm:p-12 border border-white/10 text-slate-300 whitespace-pre-line text-lg leading-relaxed font-sans shadow-2xl">
                        {relatedBlog.mainImage && typeof relatedBlog.mainImage === 'object' && (
                          <img
                            src={(relatedBlog.mainImage as Media).url || ''}
                            alt={relatedBlog.title}
                            className="rounded-t-3xl"
                          />
                        )}
                        <h2 className="text-2xl font-bold mt-4">{relatedBlog.title}</h2>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage

export async function generateStaticParams() {
  const payload = await getPayload({
    config: configPromise,
  })

  const blogs = await payload.find({
    collection: 'blogs',
    limit: 100,
  })

  return blogs.docs.map(blog => ({
    slug: blog.slug,
  }))
}
