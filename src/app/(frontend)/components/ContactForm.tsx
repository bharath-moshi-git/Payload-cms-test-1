'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  formHeading?: string | null;
  formSubheading?: string | null;
  submitButtonText?: string | null;
  successMessage?: string | null;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formHeading = 'Send Us A Message',
  formSubheading = 'Fill out the details below and our team will get back to you within 24 hours.',
  submitButtonText = 'Submit Inquiry',
  successMessage = 'Thank you! Your message has been received. Our team will contact you shortly.',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="awwwards-glass rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl backdrop-blur-xl">
      <span className="font-mono text-xs text-[#E2C08D] uppercase tracking-[0.25em] block mb-2">
        [ INQUIRY FORM // COMMUNICATIONS ]
      </span>
      <h3 className="text-3xl font-serif font-light text-slate-50 mb-3">
        {formHeading || 'Send Us A Message'}
      </h3>
      {formSubheading && (
        <p className="text-slate-400 text-sm mb-10 leading-relaxed font-sans">{formSubheading}</p>
      )}

      {submitted ? (
        <div className="p-8 rounded-2xl bg-[#E2C08D]/10 border border-[#E2C08D]/30 text-slate-100 text-center animate-fade-in space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E2C08D] text-black font-bold flex items-center justify-center text-xl mx-auto">
            ✓
          </div>
          <h4 className="text-2xl font-serif text-[#E2C08D]">Inquiry Dispatched</h4>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">{successMessage}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Inquiry Topic
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              >
                <option value="General Inquiry" className="bg-black text-slate-100">General Inquiry</option>
                <option value="Resort Booking" className="bg-black text-slate-100">Resort Booking & Stay</option>
                <option value="Villa Ownership" className="bg-black text-slate-100">Luxury Villa Ownership</option>
                <option value="Events & Private Dining" className="bg-black text-slate-100">Events & Private Dining</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your stay dates, preferred villa size, or questions..."
              className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm leading-relaxed font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-2xl transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SUBMITTING MESSAGE...' : submitButtonText || 'SUBMIT INQUIRY'}
          </button>
        </form>
      )}
    </div>
  );
};
