import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ROUTE_MAP: Record<string, string> = {
  '/': 'HOME',
  '/experience': 'EXPERIENCE',
  '/skills': 'SKILLS',
  '/game': 'GAME',
  '/music': 'MUSIC',
  '/contact': 'CONTACT',
};

interface CommandPathProps {
  className?: string;
}

export default function CommandPath({ className }: CommandPathProps) {
  const { pathname } = useLocation();
  const segment = ROUTE_MAP[pathname] ?? (pathname.replace('/', '').toUpperCase() || 'HOME');

  return (
    <span
      className={cn('font-mono text-xs whitespace-nowrap', className)}
      style={{ color: 'var(--fg-secondary)' }}
      aria-label={`Current path: ${segment}`}
    >
      C:\RUPESH\{segment}&gt;
      <span
        className="cursor-blink ml-0.5 inline-block"
        style={{ color: 'var(--fg-primary)' }}
        aria-hidden="true"
      >
        █
      </span>
    </span>
  );
}
