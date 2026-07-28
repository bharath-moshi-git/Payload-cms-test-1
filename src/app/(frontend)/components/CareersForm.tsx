'use client';

import React, { useState } from 'react';

interface JobPosition {
  title?: string | null;
  department?: string | null;
  location?: string | null;
  type?: string | null;
}

interface CareersFormProps {
  formHeading?: string | null;
  formSubheading?: string | null;
  submitButtonText?: string | null;
  successMessage?: string | null;
  positions?: JobPosition[] | null;
}

export const CareersForm: React.FC<CareersFormProps> = ({
  formHeading = 'Apply For A Position',
  formSubheading = 'Submit your resume / CV below and our HR team will review your application.',
  submitButtonText = 'Submit Application & CV',
  successMessage = 'Thank you for applying! Your application and CV have been received. We will contact you if your profile matches our requirements.',
  positions,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: (positions && positions[0]?.title) || 'General Application',
    coverLetter: '',
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size must be under 10MB.');
        return;
      }
      setCvFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setErrorMsg('Please select and upload your CV / Resume file (.pdf, .doc, .docx).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('position', formData.position);
      body.append('coverLetter', formData.coverLetter);
      body.append('cv', cvFile);

      const res = await fetch('/api/careers', {
        method: 'POST',
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: (positions && positions[0]?.title) || 'General Application',
        coverLetter: '',
      });
      setCvFile(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="awwwards-glass rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl backdrop-blur-xl" id="apply">
      <span className="font-mono text-xs text-[#E2C08D] uppercase tracking-[0.25em] block mb-2">
        [ APPLICATION FORM // CAREERS ]
      </span>
      <h3 className="text-3xl font-serif font-light text-slate-50 mb-3">
        {formHeading || 'Apply For A Position'}
      </h3>
      {formSubheading && (
        <p className="text-slate-400 text-sm mb-10 leading-relaxed font-sans">{formSubheading}</p>
      )}

      {submitted ? (
        <div className="p-8 rounded-2xl bg-[#E2C08D]/10 border border-[#E2C08D]/30 text-slate-100 text-center animate-fade-in space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E2C08D] text-black font-bold flex items-center justify-center text-xl mx-auto">
            ✓
          </div>
          <h4 className="text-2xl font-serif text-[#E2C08D]">Application Received</h4>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-full transition-all"
          >
            Submit Another Application
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
                placeholder="Jane Smith"
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
                placeholder="jane@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Target Role *
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm font-sans"
              >
                {positions && positions.length > 0 ? (
                  positions.map((pos, idx) => (
                    <option key={idx} value={pos.title || `Position ${idx + 1}`} className="bg-black text-slate-100">
                      {pos.title} {pos.department ? `(${pos.department})` : ''}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="General Application" className="bg-black text-slate-100">General Application</option>
                    <option value="Resort Operations Manager" className="bg-black text-slate-100">Resort Operations Manager</option>
                    <option value="Head Chef - Organic Dining" className="bg-black text-slate-100">Head Chef - Organic Dining</option>
                    <option value="Guest Relations Executive" className="bg-black text-slate-100">Guest Relations Executive</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Upload Resume / CV Document *
            </label>
            <div className="relative border-2 border-dashed border-white/15 hover:border-[#E2C08D]/60 rounded-2xl p-8 text-center transition-all bg-black/40 group cursor-pointer">
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#E2C08D]/10 border border-[#E2C08D]/30 text-[#E2C08D] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  📄
                </div>
                <p className="text-sm text-slate-200 font-medium font-sans">
                  {cvFile ? cvFile.name : 'Select or drag & drop your CV file here'}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  {cvFile ? `${(cvFile.size / (1024 * 1024)).toFixed(2)} MB` : 'ACCEPTED FORMATS: PDF, DOC, DOCX (MAX 10MB)'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Cover Letter / Personal Statement
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={4}
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us about your background and why you wish to join AARDE Projects..."
              className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#E2C08D] focus:ring-1 focus:ring-[#E2C08D] transition-all text-sm leading-relaxed font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#E2C08D] hover:bg-[#F4D068] rounded-2xl transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'UPLOADING CV & SUBMITTING...' : submitButtonText || 'SUBMIT APPLICATION & CV'}
          </button>
        </form>
      )}
    </div>
  );
};
