import React from 'react';

export interface JobOpening {
  title: string;
  department?: string | null;
  location?: string | null;
  type?: string | null;
  description?: string | null;
}

interface CareersOpeningsProps {
  heading?: string | null;
  subheading?: string | null;
  items?: JobOpening[] | null;
}

const defaultJobs: JobOpening[] = [
  {
    title: 'Resort Operations Manager',
    department: 'Operations',
    location: 'Coorg, Karnataka',
    type: 'Full-time',
    description:
      'Oversee day-to-day guest experiences, villa hospitality, and team operations at AARDE Estate.',
  },
  {
    title: 'Head Chef - Organic Dining',
    department: 'Food & Beverage',
    location: 'Coorg, Karnataka',
    type: 'Full-time',
    description:
      'Lead our farm-to-table culinary team utilizing fresh produce grown locally on estate farms.',
  },
  {
    title: 'Guest Relations Executive',
    department: 'Hospitality',
    location: 'Coorg, Karnataka',
    type: 'Full-time',
    description:
      'Provide personalized concierge services and memorable stays for villa owners and guests.',
  },
];

export const CareersOpenings: React.FC<CareersOpeningsProps> = ({
  heading,
  subheading,
  items,
}) => {
  const displayJobs = items && items.length > 0 ? items : defaultJobs;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
            [ CAREERS // OPEN POSITIONS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
            {heading || 'Current Openings'}
          </h2>
        </div>
        {subheading && (
          <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">{subheading}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {displayJobs.map((job, idx) => (
          <div
            key={idx}
            className="awwwards-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E2C08D] bg-[#E2C08D]/10 border border-[#E2C08D]/30 px-3 py-1 rounded-full">
                  {job.department || 'General'}
                </span>
                <span className="font-mono text-xs text-slate-500">{job.type || 'Full-time'}</span>
              </div>
              <h3 className="text-2xl font-serif font-normal text-slate-100 mb-2 group-hover:text-[#E2C08D] transition-colors">{job.title}</h3>
              <p className="font-mono text-xs text-slate-400 mb-6">📍 {job.location || 'Coorg, Karnataka'}</p>
              <p className="text-slate-400 text-sm font-sans leading-relaxed mb-8">{job.description}</p>
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#E2C08D] group-hover:text-[#F4D068] transition-colors pt-4 border-t border-white/10"
            >
              <span>Apply Now & Send CV</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
