import React from 'react';

interface CtaSectionProps {
  heading?: string | null;
  subheading?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  heading,
  subheading,
  buttonText,
  buttonLink,
  contactEmail,
  contactPhone,
}) => {
  return (
    <section className="py-32 bg-[#05070B] border-t border-white/10" id="contact">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <span className="font-mono text-xs tracking-[0.3em] text-[#E2C08D] uppercase block">
          [ 06 // RESERVATION & INQUIRY ]
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif font-light text-slate-50 tracking-tight">
          {heading || 'Plan Your Sanctuary Experience'}
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          {subheading ||
            'Connect with our dedicated estate consultants to reserve your retreat or inquire about private villa ownership.'}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={buttonLink || '/contact'}
            className="px-9 py-4 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all shadow-xl hover:scale-105"
          >
            {buttonText || 'Contact Us Today'}
          </a>
        </div>

        {(contactEmail || contactPhone) && (
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-400 border-t border-white/10 pt-8 max-w-xl mx-auto">
            {contactEmail && <div>EMAIL // {contactEmail}</div>}
            {contactPhone && <div>PHONE // {contactPhone}</div>}
          </div>
        )}
      </div>
    </section>
  );
};
