import React from 'react';

interface ContactInfoProps {
  heading?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  workingHours?: string | null;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  heading,
  address,
  email,
  phone,
  workingHours,
}) => {
  return (
    <div className="lg:col-span-5 space-y-8">
      <div className="space-y-3">
        <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
          [ DIRECT CHANNELS // CONCIERGE ]
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-100">
          {heading || 'Contact Information'}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed font-sans">
          Reach out to us directly through any of our channels below. Our support and reservation team is ready to welcome you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="awwwards-card p-6 rounded-3xl border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-[#E2C08D] flex-shrink-0">
            📍
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] mb-1">
              [ LOCATION & ADDRESS ]
            </div>
            <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
              {address || 'AARDE Luxury Estate, Coorg Hills, Karnataka, India - 571201'}
            </div>
          </div>
        </div>

        <div className="awwwards-card p-6 rounded-3xl border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-[#E2C08D] flex-shrink-0">
            ✉️
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] mb-1">
              [ ELECTRONIC MAIL ]
            </div>
            <div className="text-sm text-slate-200 font-mono">
              {email || 'stay@aarde.com'}
            </div>
          </div>
        </div>

        <div className="awwwards-card p-6 rounded-3xl border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-[#E2C08D] flex-shrink-0">
            📞
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] mb-1">
              [ TELEPHONE DIRECT ]
            </div>
            <div className="text-sm text-slate-200 font-mono">
              {phone || '+91 98765 43210'}
            </div>
          </div>
        </div>

        <div className="awwwards-card p-6 rounded-3xl border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-[#E2C08D] flex-shrink-0">
            ⏰
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#E2C08D] mb-1">
              [ OPERATING HOURS ]
            </div>
            <div className="text-sm text-slate-200 font-sans">
              {workingHours || 'Monday - Sunday: 9:00 AM - 8:00 PM'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
