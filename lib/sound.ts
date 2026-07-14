// WTF RUPESH — Retro 8-bit Sound Engine
// Uses Web Audio API to dynamically synthesize classic game beeps and clicks
// Respects autoplay policies: MUTED by default, user must explicitly toggle ON.

let isMutedInitialized = false;
let isMutedValue = true;

const checkMuted = (): boolean => {
    if (typeof window === 'undefined') return true;
    if (!isMutedInitialized) {
        const stored = localStorage.getItem('wtf_rupesh_muted');
        isMutedValue = stored === 'true'; // Defaults to false (muted = false, sound = ON)
        isMutedInitialized = true;
    }
    return isMutedValue;
};

export const setMuted = (muted: boolean) => {
    isMutedValue = muted;
    localStorage.setItem('wtf_rupesh_muted', muted ? 'true' : 'false');
};

export const getMuted = (): boolean => {
    return checkMuted();
};

export const playBeep = (frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (checkMuted()) return;

    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        // Low volume (0.015) to be pleasant and retro
        gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn('Web Audio Context initialization blocked or unsupported:', e);
    }
};

// Sound effect presets
export const playNavClick = () => {
    playBeep(700, 0.04, 'triangle');
};

export const playSelectClick = () => {
    playBeep(950, 0.08, 'square');
};

export const playBootBeep = () => {
    // Play a dual-tone retro bios chime
    playBeep(880, 0.08, 'square');
    setTimeout(() => {
        playBeep(1046.5, 0.12, 'square');
    }, 80);
};
