import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
    >
      {/* Logo / Name */}
      <div className="px-5 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <NavLink to="/" className="block">
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            Rupesh<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Senior Mobile Developer
          </span>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2 text-sm rounded-lg transition-all duration-200',
                    isActive ? 'font-medium' : 'font-normal'
                  )
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-hover)' : 'transparent',
                })}
              >
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Status */}
      <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: 'var(--status-online)' }}
          />
          Available for work
        </div>
        <div className="mt-2 text-[11px]" style={{ color: 'var(--text-dim)' }}>
          Mumbai, India
        </div>
      </div>
    </aside>
  );
}
