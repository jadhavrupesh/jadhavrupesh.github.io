import React, { createContext, useState, useContext, useMemo } from 'react';

// Trimmed to only three themes: light, dark, stealth
type Theme = 'dark' | 'light' | 'stealth' | 'light-trail' | 'nord-light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    palette: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const NORD_LIGHT_PALETTE = {
    bg: '#F5F5F5',
    surface: '#E0E0E0',
    accent: '#4F4F4F',
    text: '#363636',
    textStrong: '#1F1F1F',
    textMuted: '#6E7685',
};

const LIGHT_TRAIL_PALETTE = {
    bg: '#F2F2F2',
    surface: '#E0E0E0',
    accent: '#333333',
    text: '#333333',
    textStrong: '#111111',
    textMuted: '#666666',
};

const STEALTH_PALETTE = {
    bg: '#010203',
    surface: '#121212',
    accent: '#383E42',
    text: '#5E676E',
    textStrong: '#A7B0B6',
    textMuted: '#5E676EB3',
};

const DARK_PALETTE = {
    bg: '#0a0a0a',
    surface: '#181818',
    accent: '#fb923c',
    text: '#d1d5db',
    textMuted: '#9ca3af',
};

const LIGHT_PALETTE = {
    bg: '#f8f9fa',
    surface: '#ffffff',
    accent: '#e67e22',
    text: '#212529',
    textStrong: '#000000',
    textMuted: '#6c757d',
};

function resolvePalette(theme: Theme) {
    switch (theme) {
        case 'stealth': return STEALTH_PALETTE;
        case 'dark': return DARK_PALETTE;
        case 'light-trail': return LIGHT_TRAIL_PALETTE;
        case 'nord-light': return NORD_LIGHT_PALETTE;
        case 'light':
        default: return LIGHT_PALETTE;
    }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('nord-light');

    const toggleTheme = () => {
        setTheme(prevTheme => {
            switch (prevTheme) {
                case 'light': return 'dark';
                case 'dark': return 'stealth';
                case 'stealth': return 'light-trail';
                case 'light-trail': return 'nord-light';
                case 'nord-light':
                default: return 'light';
            }
        });
    };

    const palette = resolvePalette(theme);

    const value = useMemo(() => ({ theme, toggleTheme, palette }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
