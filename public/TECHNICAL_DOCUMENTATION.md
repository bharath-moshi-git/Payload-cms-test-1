# Complete Technical Documentation & Payload CMS Admin Integration Guide: AARDE Projects

Welcome to the comprehensive **Technical Documentation & Admin Panel Integration Guide** for **AARDE Projects** — an Awwwards-inspired luxury estate, architectural sanctuary, and resort web application built with **Next.js 16 (App Router)** and **Payload CMS 3.0**.

This document covers how every single page and section was created in the backend schema, registered in the Payload Admin Panel, queried in Next.js Server Components, rendered by frontend React components, and how content editors can update every field directly from the **Payload Admin Panel (`/admin`)**.

---

## Table of Contents

1. [Project Architecture & Setup](#1-project-architecture--setup)
   - [Tech Stack Summary](#tech-stack-summary)
   - [CLI Bootstrap Guide](#cli-bootstrap-guide)
   - [Backend & Database Architecture (PostgreSQL vs MongoDB)](#backend--database-architecture)
2. [Global Layout & Data Flow Architecture](#2-global-layout--data-flow-architecture)
3. [Page-by-Page & Section-by-Section Blueprint](#3-page-by-page--section-by-section-blueprint)
   - [A. Home Page (`/`)](#a-home-page-)
     - [1. Header Section](#1-header-section-global)
     - [2. Hero Section](#2-hero-section)
     - [3. Key Capabilities / Features Section](#3-key-capabilities--features-section)
     - [4. Amenities & Services Section (Bento Layout)](#4-amenities--services-section-bento-layout)
     - [5. Testimonials & Reviews Section](#5-testimonials--reviews-section)
     - [6. Selected Blogs Showcase Section](#6-selected-blogs-showcase-section)
     - [7. Call To Action (CTA) & Contact Section](#7-call-to-action-cta--contact-section)
   - [B. About Us Page (`/about` via dynamic `[slug]`)](#b-about-us-page-about)
     - [1. Brand Vision & Heritage Section](#1-brand-vision--heritage-section)
     - [2. Architectural Philosophy Section](#2-architectural-philosophy-section)
   - [C. Contact Page (`/contact`)](#c-contact-page-contact)
     - [1. Contact Hero & Headline](#1-contact-hero--headline)
     - [2. Interactive Contact Form](#2-interactive-contact-form)
     - [3. Contact Info & Estate Location Map](#3-contact-info--estate-location-map)
   - [D. Careers Page (`/careers`)](#d-careers-page-careers)
     - [1. Careers Hero & Culture Section](#1-careers-hero--culture-section)
     - [2. Job Openings List](#2-job-openings-list)
     - [3. Job Application Form](#3-job-application-form)
   - [E. Projects Page & Gallery (`/projects` & `/projects/[slug]`)](#e-projects-page--gallery-projects--projects-slug)
     - [1. Estate Projects Grid & Filters](#1-estate-projects-grid--filters)
     - [2. Individual Project Detail Page](#2-individual-project-detail-page)
   - [F. Blogs Page & Article Viewer (`/blogs` & `/blogs/[slug]`)](#f-blogs-page--article-viewer-blogs--blogs-slug)
     - [1. Article Listing Grid](#1-article-listing-grid)
     - [2. Single Blog Post Viewer](#2-single-blog-post-viewer)
   - [G. Global Footer Component](#g-global-footer-component)
4. [Master Payload Admin Panel Content Editor Guide](#4-master-payload-admin-panel-content-editor-guide)

---

## 1. Project Architecture & Setup

### Tech Stack Summary

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `16.2.6` | React server-side rendering, hybrid caching, file-based routing. |
| **CMS Engine** | **Payload CMS 3.0** | `3.86.0` | Native TypeScript CMS embedded seamlessly into Next.js App Router. |
| **Database** | **PostgreSQL** via `@payloadcms/db-postgres` | `3.86.0` | Relational database adapter utilizing Drizzle ORM and connection pooling. |
| **Styling** | **Tailwind CSS v4 + Custom Glassmorphism** | `4.0.0` | Utility CSS with custom dark mode theme tokens, backdrop filters, and keyframe animations. |
| **Rich Text** | **Lexical Editor** | `3.86.0` | Node-based WYSIWYG block editor for blog posts and long-form page content. |
| **Image Optimization** | **Sharp** | `0.34.2` | Server-side image resizing, metadata extraction, and WebP generation. |

---

### CLI Bootstrap Guide

```bash
# 1. Initialize Payload 3.0 App
pnpm create payload-app@latest payloadtest1

# 2. Select Database & Router Configuration
# - Template: Blank
# - Database: PostgreSQL (@payloadcms/db-postgres)
# - Next.js App Router: Enabled

# 3. Install Core & Dev Dependencies
cd payloadtest1
pnpm add payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical sharp react react-dom next cross-env dotenv
pnpm add -D tailwindcss @tailwindcss/postcss postcss typescript @types/node @types/react @types/react-dom

# 4. Configure Environment (.env)
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/payloadtest1
PAYLOAD_SECRET=e7b419fa7b91924b123456789abcdef
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# 5. Build Types & Launch Server
pnpm run generate:types
pnpm dev
```

---

### Backend & Database Architecture

#### Why PostgreSQL?
1. **Strict Schema Constraints**: Ensures that relational data (such as linking a Blog Post to an Author User or a Project to a Category) remains structurally intact without missing references.
2. **Atomic Form Submissions**: Contact forms (`contact-submissions`) and career resumes (`career-applications`) are written directly to relational SQL tables with full transaction guarantees.
3. **Payload Drizzle Integration**: Payload 3.0 converts Collection Config TypeScript files directly into Drizzle ORM tables, automatically handling database migrations.

#### Database Pool Configuration (`src/payload.config.ts`)
```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    },
  }),
})
```

---

## 2. Global Layout & Data Flow Architecture

The application uses Next.js **Route Groups** to decouple the CMS Backend from the public user-facing website:

```text
src/app/
├── (frontend)/           # Public Website Routes
│   ├── layout.tsx        # Root HTML wrapper, Google Fonts & Global Footer
│   ├── page.tsx          # Homepage Server Component
│   ├── [slug]/page.tsx   # Dynamic Pages
│   ├── blogs/            # Blog Listing & Dynamic Post Pages
│   ├── careers/          # Career Openings & Job Application Form
│   ├── contact/          # Contact Page with location map
│   ├── projects/         # Estate Projects & Detail Pages
│   ├── components/       # Presentational React Components
│   └── sections/         # Modular Page Sections
└── (payload)/            # CMS Engine Routes
    ├── admin/            # Payload Admin Control Panel (/admin)
    └── api/              # Auto-generated REST & GraphQL APIs (/api)
```

---

## 3. Page-by-Page & Section-by-Section Blueprint

This section explains **every single section across all pages**, detailing:
1. **Schema Definition**: How fields were created in `src/collections/`.
2. **Payload Fetching**: How the Server Component queries Payload Local API (`getPayload()`).
3. **Component Rendering**: How the React component receives props and renders JSX.
4. **Admin Panel Editing**: Exactly where and how to edit the content inside `/admin`.

---

### A. Home Page (`/`)

#### 1. Header Section (Global)

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Created inside the `header` group field under the 'Header Section' tab:
```typescript
{
  name: 'header',
  type: 'group',
  fields: [
    { name: 'logoText', type: 'text', defaultValue: 'A A R D E' },
    { name: 'logoSubtext', type: 'text', defaultValue: 'PROJECTS' },
    { name: 'headerCtaText', type: 'text', defaultValue: 'Book A Stay' },
    { name: 'headerCtaLink', type: 'text', defaultValue: '/contact' },
  ]
}
```

##### Payload Call (`src/app/(frontend)/page.tsx`)
```typescript
const payload = await getPayload({ config: configPromise });
const result = await payload.find({ collection: 'home-page', depth: 2, limit: 1 });
const header = result.docs[0]?.header;
```

##### Component Usage (`src/app/(frontend)/components/Header.tsx`)
```tsx
<Header
  logoText={header?.logoText || 'A A R D E'}
  logoSubtext={header?.logoSubtext || 'PROJECTS'}
  headerCtaText={header?.headerCtaText || 'Book A Stay'}
  headerCtaLink={header?.headerCtaLink || '/contact'}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Log in to `http://localhost:3000/admin`.
2. Click **Pages > Home Page** in the sidebar.
3. Click the **Header Section** tab.
4. Change **Logo Text**, **Logo Subtext**, **Header Button Text**, or **Header Button Link**.
5. Click **Save Changes** at the top right.

---

#### 2. Hero Section

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Created inside the `hero` group field under the 'Hero Section' tab:
```typescript
{
  name: 'hero',
  type: 'group',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'The Jewel of Coorg, Where Time Slows Down.' },
    { name: 'headingHighlight', type: 'text', defaultValue: 'Coorg,' },
    { name: 'subheading', type: 'textarea', defaultValue: 'Beyond the experience of a resort...' },
    { name: 'ctaText', type: 'text', defaultValue: 'Explore Residences' },
    { name: 'ctaLink', type: 'text', defaultValue: '#brochure' },
    { name: 'fallbackImageUrl', type: 'text', defaultValue: '/coorg_bg.jpg' },
  ]
}
```

##### Payload Call (`src/app/(frontend)/page.tsx`)
```typescript
const hero = homePageDoc?.hero;
const fallbackImageUrl = hero?.fallbackImageUrl || '/coorg_bg.jpg';
```

##### Component Usage (`src/app/(frontend)/components/Hero.tsx`)
```tsx
<div style={{ backgroundImage: `url(${fallbackImageUrl})` }}>
  <Hero
    heading={hero?.heading}
    headingHighlight={hero?.headingHighlight}
    subheading={hero?.subheading}
    ctaText={hero?.ctaText}
    ctaLink={hero?.ctaLink}
  />
</div>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page**.
2. Click the **Hero Section** tab.
3. Edit **Hero Main Heading**, **Highlighted Word**, **Subheading**, or **Primary CTA Button Text**.
4. Click **Save Changes**.

---

#### 3. Key Capabilities / Features Section

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Created inside the `features` group with a nested `items` array field:
```typescript
{
  name: 'features',
  type: 'group',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Architectural Capabilities' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text', defaultValue: '⚡' },
      ]
    }
  ]
}
```

##### Payload Call & Component Usage (`src/app/(frontend)/components/Features.tsx`)
```tsx
<Features
  heading={features?.heading || 'Architectural Capabilities'}
  subheading={features?.subheading}
  items={features?.items}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page**.
2. Click the **Key Capabilities Section** tab.
3. Add, reorder, or delete card items in the **Feature Cards** list.
4. Click **Save Changes**.

---

#### 4. Amenities & Services Section (Bento Layout)

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Defined under the `services` group with nested `items` array.

##### Payload Call & Component Usage (`src/app/(frontend)/components/ServicesAmenities.tsx`)
```tsx
<ServicesAmenities
  heading={services?.heading}
  subheading={services?.subheading}
  items={services?.items}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page** -> **Amenities & Services Section** tab.
2. Edit **Section Heading** and modify individual service card titles, descriptions, and emojis.

---

#### 5. Testimonials & Reviews Section

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Defined under `testimonials` group with array of quotes, author names, and locations.

##### Component Usage (`src/app/(frontend)/components/Testimonials.tsx`)
```tsx
<Testimonials
  heading={testimonials?.heading}
  subheading={testimonials?.subheading}
  items={testimonials?.items}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page** -> **Testimonials Section** tab.
2. Update review quotes, author names, and guest locations.

---

#### 6. Selected Blogs Showcase Section

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Uses a Payload `relationship` field linking directly to the `blogs` collection:
```typescript
{
  name: 'blogs',
  type: 'group',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'From the Blog' },
    { name: 'selectedBlogs', type: 'relationship', relationTo: 'blogs', hasMany: true },
  ]
}
```

##### Component Usage (`src/app/(frontend)/components/BlogsSection.tsx`)
```tsx
<BlogsSection
  heading={blogsSection?.heading}
  subheading={blogsSection?.subheading}
  selectedBlogs={blogsSection?.selectedBlogs}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page** -> **Blogs Section** tab.
2. Click **Selected Blogs** dropdown to pick specific published articles to feature on the homepage.

---

#### 7. Call To Action (CTA) & Contact Section

##### Schema Definition (`src/collections/pages/HomePage.ts`)
Defined under `cta` group field.

##### Component Usage (`src/app/(frontend)/components/CtaSection.tsx`)
```tsx
<CtaSection
  heading={cta?.heading}
  subheading={cta?.subheading}
  buttonText={cta?.buttonText}
  buttonLink={cta?.buttonLink}
  contactEmail={cta?.contactEmail}
  contactPhone={cta?.contactPhone}
/>
```

##### How to Edit in Admin Panel (`/admin`)
1. Open `/admin` -> **Pages > Home Page** -> **Call To Action / Contact Section** tab.
2. Modify phone numbers, email addresses, button text, and destination URLs.

---

### B. About Us Page (`/about` via dynamic `[slug]`)

#### 1. Brand Vision & Heritage Section

##### Schema Definition (`src/collections/pages/AboutUs.ts`)
Contains tabs for Header, Hero, Heritage Story, and Team Members.

##### Payload Call (`src/app/(frontend)/[slug]/page.tsx`)
```typescript
const payload = await getPayload({ config: configPromise });
const result = await payload.find({
  collection: 'pages',
  where: { slug: { equals: params.slug } }
});
```

##### How to Edit in Admin Panel (`/admin`)
1. Go to `/admin` -> **Pages > About Us Page**.
2. Update vision text, heritage story paragraphs, and team profiles.

---

### C. Contact Page (`/contact`)

#### 1. Contact Hero & Headline
- **Schema File**: `src/collections/pages/ContactUs.ts`
- **Page Component**: `src/app/(frontend)/contact/page.tsx`
- **Admin Tab**: `/admin` -> **Pages > Contact Us Page** -> **Hero Section**.

#### 2. Interactive Contact Form
- **Component File**: `src/app/(frontend)/components/ContactForm.tsx`
- **Database Storage**: Form submissions are automatically posted via `/api/contact-submissions` and saved to the `ContactSubmissions` collection in PostgreSQL.
- **Admin View**: Go to `/admin` -> **Collections > Contact Submissions** to view submitted visitor inquiries.

#### 3. Contact Info & Estate Location Map
- **Component File**: `src/app/(frontend)/components/ContactInfo.tsx` & `LocationMap.tsx`
- **Admin Editing**: Go to `/admin` -> **Pages > Contact Us Page** -> **Contact Information**.

---

### D. Careers Page (`/careers`)

#### 1. Job Openings List
- **Schema File**: `src/collections/pages/Careers.ts`
- **Page Component**: `src/app/(frontend)/careers/page.tsx`
- **Admin Editing**: Open `/admin` -> **Pages > Careers Page** -> **Open Positions Tab** to add or remove job roles.

#### 2. Job Application Form
- **Component File**: `src/app/(frontend)/components/CareersForm.tsx`
- **Database Storage**: Applications post to `/api/career-applications` and save inside PostgreSQL.
- **Admin View**: View submissions under `/admin` -> **Collections > Career Applications**.

---

### E. Projects Page & Gallery (`/projects` & `/projects/[slug]`)

#### 1. Estate Projects Grid & Detail Page
- **Schema File**: `src/collections/Projects.ts` & `ProjectCategories.ts`
- **Page Route**: `src/app/(frontend)/projects/page.tsx`
- **Admin Editing**: Go to `/admin` -> **Collections > Projects**. Click **Create New** to publish a new real estate villa or resort project with images, category tags, floor plans, and pricing.

---

### F. Blogs Page & Article Viewer (`/blogs` & `/blogs/[slug]`)

#### 1. Article Listing & Post Viewer
- **Schema File**: `src/collections/Blogs.ts` & `BlogCategories.ts`
- **Page Routes**: `src/app/(frontend)/blogs/page.tsx` & `src/app/(frontend)/blogs/[slug]/page.tsx`
- **Admin Editing**: Go to `/admin` -> **Collections > Blogs**. Use the **Lexical Rich Text Editor** to compose articles, add headings, blockquotes, code snippets, and upload cover images.

---

### G. Global Footer Component

#### 1. Structure & Rendering
- **File Location**: `src/app/(frontend)/components/Footer.tsx`
- **Mounted In**: `src/app/(frontend)/layout.tsx` globally at the bottom of every route.
- **Editing Content**: To update static sitemap links or estate address footer text, modify `Footer.tsx` directly.

---

## 4. Master Payload Admin Panel Content Editor Guide

Here is a quick summary reference for content editors on how to manage any part of the site:

| Section to Edit | Admin Panel Path | Key Action |
| :--- | :--- | :--- |
| **Homepage Header / Navigation CTA** | `/admin` -> Pages -> Home Page -> **Header Section** | Edit brand title & CTA link |
| **Homepage Hero Banner** | `/admin` -> Pages -> Home Page -> **Hero Section** | Edit main heading & background image |
| **Feature Cards** | `/admin` -> Pages -> Home Page -> **Key Capabilities Section** | Add/Remove feature cards |
| **Bento Amenities Grid** | `/admin` -> Pages -> Home Page -> **Amenities & Services Section** | Edit cards & emojis |
| **Guest Reviews** | `/admin` -> Pages -> Home Page -> **Testimonials Section** | Edit guest quotes & names |
| **Featured Homepage Blogs** | `/admin` -> Pages -> Home Page -> **Blogs Section** | Select relationship blog posts |
| **Publish New Blog Article** | `/admin` -> Collections -> **Blogs** | Click **Create New**, fill title & body |
| **Add Real Estate Project** | `/admin` -> Collections -> **Projects** | Click **Create New**, add images & specs |
| **View Customer Messages** | `/admin` -> Collections -> **Contact Submissions** | View received contact forms |
| **View Job Applications** | `/admin` -> Collections -> **Career Applications** | View submitted applicant resumes |

---

*Document updated & verified for AARDE Projects Payload 3.0 & Next.js 16 stack.*
