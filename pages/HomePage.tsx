import { Link } from 'react-router-dom';
import { personalInfo, professionalSummary } from '../constants';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center" style={{ minHeight: '68vh', marginTop: '20px' }}>
      {/* ── Minimalist Hero Landing ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container grid-12">
          <div className="hero__content">
            <p className="hero__eyebrow">Meet the</p>
            <h1 className="hero__title" id="hero-heading">
              {personalInfo.roleCursive}
            </h1>

            {/* ── Centered Profile Portrait ── */}
            <div className="my-6 flex justify-center">
              <figure className="relative inline-block">
                <img
                  src="/profile.jpg"
                  alt={`${personalInfo.name}, ${personalInfo.roleTitle}`}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-[3px] border-black shadow-md mx-auto block"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </figure>
            </div>

            <p className="hero__statement">
              <span>Building software systems</span>
              <span>where clean architecture</span>
              <span>meets daily AI-driven</span>
              <span>velocity.</span>
            </p>
            <p className="hero__description">{professionalSummary}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <Link className="hero__cta" to="/works" aria-label="Explore Works">
                <span className="hero__cta-label">Explore Works</span>
                <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                  Explore Works
                </span>
              </Link>
              <Link className="hero__cta" to="/about" aria-label="About Me">
                <span className="hero__cta-label">About Me</span>
                <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                  About Me
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


