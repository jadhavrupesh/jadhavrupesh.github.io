import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 h-14 border-b shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
      >
        <NavLink to="/" className="text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          Rupesh<span style={{ color: 'var(--accent)' }}>.</span>
        </NavLink>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ color: 'var(--text-secondary)', background: 'var(--bg-hover)' }}
          aria-label="Toggle menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 5h12M2 8h12M2 11h12" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="md:hidden mobile-menu-enter absolute top-14 left-0 right-0 z-50 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
        >
          <ul className="py-2">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 text-sm transition-colors"
                    style={{
                      color: active ? 'var(--text)' : 'var(--text-secondary)',
                      background: active ? 'var(--bg-hover)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
