import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CommandPath from '@/components/layout/CommandPath';
import { getMuted, setMuted } from '@/lib/sound';

interface StatusBarProps {
  className?: string;
}

export default function StatusBar({ className }: StatusBarProps) {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [muted, setMutedState] = useState(getMuted);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMuted = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMutedState(nextMuted);
    if (!nextMuted) {
      // Play a quick beep to confirm sound is enabled
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        }
      } catch (e) {}
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex items-center justify-between',
        'px-3 md:px-4 h-8 border-b select-none',
        className
      )}
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
      }}
      aria-label="Status bar"
    >
      {/* Left — Title */}
      <div
        className="font-pixel text-[8px] tracking-wider whitespace-nowrap"
        style={{ color: 'var(--fg-primary)' }}
      >
        WTF RUPESH
      </div>

      {/* Center — DOS path */}
      <div className="hidden sm:block">
        <CommandPath />
      </div>

      {/* Right — Time + hint */}
      <div
        className="flex items-center gap-3 text-[10px] font-mono"
        style={{ color: 'var(--fg-muted)' }}
      >
        <button
          onClick={toggleMuted}
          className="text-[9px] uppercase tracking-[0.05em] border border-[var(--border-default)] px-1.5 py-0.5 hover:text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer select-none"
          style={{ borderRadius: 'var(--radius-sm)' }}
          aria-label={muted ? "Unmute sounds" : "Mute sounds"}
        >
          {muted ? '🔇 SOUND: OFF' : '🔊 SOUND: ON'}
        </button>
        <time dateTime={new Date().toISOString().slice(0, 10)} aria-live="polite">
          {time}
        </time>
        <span
          className="hidden md:inline"
          style={{ color: 'var(--fg-muted)' }}
        >
          [ESC] MENU
        </span>
      </div>
    </header>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
