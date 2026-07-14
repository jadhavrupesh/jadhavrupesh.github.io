import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { NAV_ITEMS } from '@/components/layout/RetroNavigation';

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={cn('md:hidden', className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Trigger button */}
        <SheetTrigger asChild>
          <button
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono border"
            style={{
              color: 'var(--fg-secondary)',
              borderColor: 'var(--border-default)',
              background: 'var(--bg-muted)',
            }}
            aria-label="Open navigation menu"
          >
            <Menu size={14} aria-hidden="true" />
            <span>MENU</span>
          </button>
        </SheetTrigger>

        {/* Sheet content — slides from left */}
        <SheetContent side="left" className="p-0 w-[280px]">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle>NAVIGATION</SheetTitle>
          </SheetHeader>

          <nav aria-label="Mobile navigation">
            <ul className="py-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 px-4 py-3 text-xs font-mono',
                        'transition-colors duration-[var(--duration-fast)]',
                        'focus-visible:outline-2 focus-visible:outline-[var(--ring-focus)]',
                        isActive ? 'font-semibold' : ''
                      )
                    }
                    style={({ isActive }) => ({
                      background: isActive ? 'var(--bg-active)' : undefined,
                      color: isActive ? 'var(--fg-active)' : 'var(--fg-secondary)',
                    })}
                    onClick={() => setOpen(false)}
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
                        <span
                          className="text-[10px]"
                          style={{
                            color: isActive ? 'var(--fg-active)' : 'var(--fg-muted)',
                          }}
                        >
                          {item.index}
                        </span>
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
