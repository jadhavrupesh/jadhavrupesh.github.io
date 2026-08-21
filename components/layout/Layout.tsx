import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (main) main.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Top Bar + Dropdown */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40">
        <MobileNav />
      </div>

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-12 pt-20 md:pt-12"
        role="main"
      >
        <div key={pathname} className="page-enter page-enter-active max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
