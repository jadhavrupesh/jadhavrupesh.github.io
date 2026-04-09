import React, { createContext, useContext, useMemo } from 'react';

interface ThemeContextType {
    palette: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PALETTE = {
    bg: '#000000',
    surface: '#121212',
    accent: '#d4d4d4',
    text: '#fafafa',
    textStrong: '#ffffff',
    textMuted: '#a3a3a3',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = useMemo(() => ({ palette: PALETTE }), []);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
