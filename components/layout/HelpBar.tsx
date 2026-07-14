import { cn } from '@/lib/utils';

interface HelpBarProps {
  className?: string;
}

export default function HelpBar({ className }: HelpBarProps) {
  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'hidden sm:flex items-center justify-between',
        'px-4 h-7 text-[10px] font-mono border-t select-none',
        className
      )}
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        color: 'var(--fg-muted)',
      }}
      aria-label="Help bar"
    >
      {/* Keyboard hints */}
      <div className="flex items-center gap-4">
        <span>
          <kbd className="font-mono" style={{ color: 'var(--fg-secondary)' }}>[↑↓]</kbd>{' '}
          NAVIGATE
        </span>
        <span>
          <kbd className="font-mono" style={{ color: 'var(--fg-secondary)' }}>[ENTER]</kbd>{' '}
          SELECT
        </span>
        <span>
          <kbd className="font-mono" style={{ color: 'var(--fg-secondary)' }}>[ESC]</kbd>{' '}
          BACK
        </span>
      </div>

      {/* Version */}
      <div className="flex items-center gap-3">
        <span
          className="inline-block w-1.5 h-1.5"
          style={{ background: 'var(--fg-muted)' }}
          aria-hidden="true"
        />
        <span>v1.0.0</span>
      </div>
    </footer>
  );
}
