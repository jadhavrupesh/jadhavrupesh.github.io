import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { personalInfo } from '../../constants';

const NAV_ITEMS = [
  { label: 'Overview', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills & Stack', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r glass-panel z-30"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Brand Header */}
      <div className="px-6 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
        <NavLink to="/" className="block group">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
              RJ
            </div>
            <div>
              <span className="text-base font-bold tracking-tight block" style={{ color: 'var(--text)' }}>
                Rupesh Jadhav
              </span>
              <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>
                Senior Mobile Developer
              </span>
            </div>
          </div>
        </NavLink>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl transition-all duration-200 group relative',
                    isActive ? 'font-medium' : 'font-normal'
                  )
                }
                style={({ isActive }) => ({
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                })}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      style={{
                        background: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                        boxShadow: isActive ? '0 0 8px var(--accent-cyan)' : 'none',
                      }}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Status */}
      <div className="p-5 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          <span
            className="w-2 h-2 rounded-full pulse-online shrink-0"
            style={{ background: 'var(--status-available)' }}
          />
          <span>Available for New Roles</span>
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{personalInfo.location}</span>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </aside>
  );
}
