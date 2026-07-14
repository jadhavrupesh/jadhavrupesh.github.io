import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { index: '01', label: 'HOME', path: '/' },
  { index: '02', label: 'EXPERIENCE', path: '/experience' },
  { index: '03', label: 'SKILLS', path: '/skills' },
  { index: '04', label: 'GAME', path: '/game' },
  { index: '05', label: 'MUSIC', path: '/music' },
  { index: '06', label: 'CONTACT', path: '/contact' },
];

interface RetroNavigationProps {
  className?: string;
}

export default function RetroNavigation({ className }: RetroNavigationProps) {
  return (
    <nav
      className={cn(
        'hidden md:flex flex-col',
        'w-[200px] min-w-[200px] shrink-0',
        'sticky top-8 self-start h-[calc(100vh-60px)]',
        'border-r',
        className
      )}
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
      }}
      aria-label="Main navigation"
    >
      {/* Nav header */}
      <div
        className="px-3 py-2 border-b font-pixel text-[8px] tracking-wider"
        style={{
          borderColor: 'var(--border-default)',
          color: 'var(--fg-muted)',
        }}
      >
        NAVIGATION
      </div>

      {/* Nav items */}
      <ul className="flex-1 py-1" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-2 text-xs font-mono',
                  'transition-colors duration-[var(--duration-fast)]',
                  'focus-visible:outline-2 focus-visible:outline-[var(--ring-focus)]',
                  isActive
                    ? 'font-semibold'
                    : 'retro-hover'
                )
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--bg-active)' : undefined,
                color: isActive ? 'var(--fg-active)' : 'var(--fg-secondary)',
              })}
            >
              {({ isActive }) => (
                <>
                  <span
                    className="w-3 text-[10px] inline-block"
                    aria-hidden="true"
                    style={{
                      color: isActive ? 'var(--fg-active)' : 'var(--fg-muted)',
                    }}
                  >
                    {isActive ? '>' : ' '}
                  </span>
                  <span className="text-[10px]" style={{ color: isActive ? 'var(--fg-active)' : 'var(--fg-muted)' }}>
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bottom decoration */}
      <div
        className="px-3 py-2 border-t text-[9px] font-mono"
        style={{
          borderColor: 'var(--border-default)',
          color: 'var(--fg-muted)',
        }}
      >
        <div>6 ITEMS</div>
        <div className="dot-matrix mt-1" aria-hidden="true" />
      </div>
    </nav>
  );
}

export { NAV_ITEMS, type NavItem };
