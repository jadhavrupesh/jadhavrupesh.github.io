import { useState } from 'react';
import { personalInfo } from '../constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <div className="grid-12">
        <div className="span-8">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
            Get in touch
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-tight">
            <span>Have a good</span><br />
            <span>problem to solve?</span>
          </h1>
          <p className="mt-6 text-lg font-mono text-zinc-600 max-w-xl">
            {personalInfo.availability}. Always excited to discuss mobile architecture, KMP foundations, and scalable apps.
          </p>
        </div>

        <div className="span-4 flex flex-col justify-start items-start sm:items-end">
          <div className="site-footer__stamp" style={{ marginTop: '20px' }}>
            <span>RUPESH JADHAV · EST. 2019 · MUMBAI</span>
          </div>
        </div>
      </div>

      <div className="section-rule" aria-hidden="true" style={{ marginTop: '60px' }} />

      <div className="grid-12" style={{ marginTop: '60px' }}>
        {/* Direct Channels */}
        <div className="span-5">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-black mb-6">
            Direct Contact
          </h2>
          <div className="space-y-4 font-mono text-base">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Email</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-black font-semibold hover:text-red-700 transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">Phone</p>
              <a
                href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="text-black font-semibold hover:text-red-700 transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">Location</p>
              <p className="text-zinc-700">{personalInfo.location}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">Profiles</p>
              <div className="flex gap-4 mt-1">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rolling-link text-xs font-bold"
                >
                  <span className="rolling-label">LinkedIn ↗</span>
                  <span className="rolling-label rolling-label--hover">LinkedIn ↗</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rolling-link text-xs font-bold"
                >
                  <span className="rolling-label">GitHub ↗</span>
                  <span className="rolling-label rolling-label--hover">GitHub ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Box */}
        <div className="span-7">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-black mb-6">
            Send a note
          </h2>

          {submitted ? (
            <div className="p-8 border border-black text-center space-y-3" style={{ background: '#ffffff' }}>
              <p className="font-mono font-bold text-lg text-black">Note received!</p>
              <p className="font-mono text-xs text-zinc-600">
                Thank you for getting in touch. I will respond to your message promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white border border-zinc-400 focus:border-black focus:outline-none font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 bg-white border border-zinc-400 focus:border-black focus:outline-none font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the role, project, or challenge..."
                  className="w-full px-4 py-3 bg-white border border-zinc-400 focus:border-black focus:outline-none font-mono text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="hero__cta cursor-pointer"
              >
                <span className="hero__cta-label">Send message</span>
                <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                  Send message
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

