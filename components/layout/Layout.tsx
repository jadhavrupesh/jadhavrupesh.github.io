import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { personalInfo } from '../../constants';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ background: 'var(--color-background)' }}>
      {/* Minimalist Sticky Header */}
      <Navbar />

      {/* Main Content View */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Universal Editorial Footer */}
      <footer className="site-footer" id="contact" aria-labelledby="footer-heading">
        <div className="container grid-12">
          {/* Contact Details Column */}
          <div className="site-footer__contact span-8">
            <h2 className="site-footer__heading" id="footer-heading">
              <span>Have a good</span>
              <span>problem to solve?</span>
            </h2>
            <p className="site-footer__availability">{personalInfo.availability}</p>
            <div className="site-footer__details">
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}>{personalInfo.phone}</a>
            </div>
          </div>

          {/* Navigation Column */}
          <nav className="site-footer__navigation span-4" aria-label="Footer navigation">
            <a
              className="hero__cta site-footer__link"
              href="https://github.com/jadhavrupesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__cta-label">GitHub Profile</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                GitHub Profile
              </span>
            </a>
            <Link className="hero__cta site-footer__link" to="/works">
              <span className="hero__cta-label">Works</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                Works
              </span>
            </Link>
            <Link className="hero__cta site-footer__link" to="/about">
              <span className="hero__cta-label">About me</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                About me
              </span>
            </Link>
            <Link className="hero__cta site-footer__link" to="/journal">
              <span className="hero__cta-label">Journal</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                Journal
              </span>
            </Link>

            {/* Stamp Badge */}
            <div className="site-footer__stamp">
              <span>RUPESH JADHAV · EST. 2019 · MUMBAI</span>
            </div>
          </nav>
        </div>

        {/* Bottom Socials Bar */}
        <div className="container site-footer__bottom">
          <nav className="site-footer__socials" aria-label="Social links">
            <a
              className="hero__cta"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__cta-label">LinkedIn</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                LinkedIn
              </span>
            </a>
            <a
              className="hero__cta"
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__cta-label">GitHub</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                GitHub
              </span>
            </a>
            <a
              className="hero__cta"
              href={`mailto:${personalInfo.email}`}
            >
              <span className="hero__cta-label">Email</span>
              <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
                Email
              </span>
            </a>
          </nav>
          <p className="site-footer__copyright">© {new Date().getFullYear()} Rupesh Jadhav</p>
        </div>

        {/* Legal Disclaimer */}
        <div className="container grid-12">
          <p className="site-footer__legal span-12">
            The engineering case studies and architecture notes showcased on this website represent production systems designed across FinTech, Banking, and Mobility.
          </p>
        </div>
      </footer>
    </div>
  );
}

