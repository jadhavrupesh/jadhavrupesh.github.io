import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Overview', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills & Stack', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Glass Top Bar */}
      <div
        className="md:hidden flex items-center justify-between px-5 h-16 border-b glass-panel backdrop-blur-lg shrink-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
            RJ
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            Rupesh<span className="gradient-text">.</span>
          </span>
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200"
          style={{
            color: 'var(--text)',
            background: 'rgba(255, 255, 255, 0.06)',
            borderColor: 'var(--border-strong)',
          }}
          aria-label="Toggle Navigation Menu"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
            {open ? (
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h12M2 8h12M2 11.5h12" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Glass Dropdown Menu */}
      {open && (
        <div
          className="md:hidden mobile-menu-enter absolute top-16 left-0 right-0 z-50 border-b glass-panel p-4"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-glass)' }}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all"
                    style={{
                      color: active ? '#ffffff' : 'var(--text-secondary)',
                      background: active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      border: active ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                    }}
                  >
                    <span>{item.label}</span>
                    {active && <span className="text-xs font-mono text-indigo-400">● Active</span>}
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
