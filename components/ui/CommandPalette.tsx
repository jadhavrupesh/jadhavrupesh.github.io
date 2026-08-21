import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onShowToast,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      category: 'Navigation',
      items: [
        { label: 'Go to Overview', icon: '🏠', action: () => { navigate('/'); onClose(); } },
        { label: 'Go to Experience', icon: '💼', action: () => { navigate('/experience'); onClose(); } },
        { label: 'Go to Skills & Stack', icon: '⚡', action: () => { navigate('/skills'); onClose(); } },
        { label: 'Go to Selected Projects', icon: '🚀', action: () => { navigate('/projects'); onClose(); } },
        { label: 'Go to Contact', icon: '✉️', action: () => { navigate('/contact'); onClose(); } },
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        {
          label: 'Copy Email Address',
          icon: '📋',
          action: () => {
            navigator.clipboard.writeText(personalInfo.email);
            onShowToast('Email copied to clipboard!');
            onClose();
          },
        },
        {
          label: 'Copy Phone Number',
          icon: '📞',
          action: () => {
            navigator.clipboard.writeText(personalInfo.phone);
            onShowToast('Phone number copied to clipboard!');
            onClose();
          },
        },
        {
          label: 'Open LinkedIn Profile',
          icon: '🔗',
          action: () => {
            window.open(personalInfo.linkedin, '_blank');
            onClose();
          },
        },
        {
          label: 'Open GitHub Profile',
          icon: '🐙',
          action: () => {
            window.open(personalInfo.github, '_blank');
            onClose();
          },
        },
      ],
    },
  ];

  const filtered = actions.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 modal-overlay">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-zinc-800 shadow-2xl modal-content overflow-hidden z-10">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/80">
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search page... (Esc to close)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 rounded border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 font-mono">
              No matching commands found for "{query}"
            </div>
          ) : (
            filtered.map((cat) => (
              <div key={cat.category}>
                <div className="px-3 py-1.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {cat.category}
                </div>
                <div className="space-y-1 mt-1">
                  {cat.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-indigo-500/15 hover:border hover:border-indigo-500/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span className="font-medium group-hover:text-indigo-300">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 group-hover:text-indigo-400">
                        Select →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Rupesh Jadhav Command Center</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">⌘K</kbd>
            <span>anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
