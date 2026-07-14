import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';
import { Button } from '@/components/ui/button';
import { playBeep } from '@/lib/sound';

// Sound presets for game actions
const playEatChime = () => {
    playBeep(1300, 0.05, 'triangle');
};

const playCrashChime = () => {
    playBeep(350, 0.12, 'sawtooth');
    setTimeout(() => {
        playBeep(220, 0.25, 'sawtooth');
    }, 120);
};

const playTurnChime = () => {
    playBeep(700, 0.02, 'sine');
};

const playTickChime = () => {
    playBeep(900, 0.015, 'sine');
};

const playLaunchChime = () => {
    playBeep(880, 0.08, 'square');
    setTimeout(() => {
        playBeep(1100, 0.12, 'square');
    }, 80);
};

interface Point {
    x: number;
    y: number;
}

const GRID_SIZE = 20;
const SPEED = 110;

// Embedded Iframe Custom Snake Game Wrapper inside a physical CRT arcade monitor bezel
const SnakeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="outline-none select-none w-full h-full font-mono bg-[#030303]">
            {/* CRT Screen Bezel (Outer heavy plastic shell) */}
            <div 
                className="relative w-full overflow-hidden border-[12px] border-[#18181b] bg-[#000000]" 
                style={{ 
                    borderRadius: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.85), inset 0 2px 10px rgba(255,255,255,0.05), inset 0 -2px 10px rgba(0,0,0,0.9)'
                }}
            >
                {/* Retro Scanline Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none z-10 opacity-[0.14]" 
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0px, rgba(0, 0, 0, 0.22) 1.5px, transparent 1.5px, transparent 3px)`
                    }}
                />

                {/* Tube Vignette & Inner Reflections */}
                <div 
                    className="absolute inset-0 pointer-events-none z-10" 
                    style={{
                        boxShadow: 'inset 0 0 70px rgba(0,0,0,0.95), inset 0 0 15px rgba(255,255,255,0.03)'
                    }}
                />

                {/* Glowing Phosphorus Screen Filter */}
                <div 
                    className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-emerald-500 mix-blend-color-dodge animate-pulse" 
                    style={{ animationDuration: '6s' }}
                />

                {/* Game Iframe (Taller height to prevent stats/footer cropping) */}
                <iframe 
                    src="/games/snake/index.html" 
                    className="border-0 select-none relative z-0" 
                    title="Snake Game v3.0"
                    scrolling="no"
                    style={{ 
                        display: 'block',
                        width: '100%',
                        height: '670px',
                        transform: 'scale(1.002)',
                        transformOrigin: 'center'
                    }}
                />
            </div>

            {/* CRT Bezel Analog Controls (Fake dials and status readouts) */}
            <div className="w-full mt-3 flex justify-between items-center text-[9px] font-mono text-[var(--fg-muted)] px-2 select-none">
                <div className="flex gap-2 items-center">
                    <span>BRIGHTNESS</span>
                    <div className="w-12 h-1 bg-[var(--border-default)] relative">
                        <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--fg-muted)] rounded-full" />
                    </div>
                </div>

                {/* Red Arcade Exit Button */}
                <button
                    onClick={onBack}
                    className="bg-red-950/40 border border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 px-3 py-1 font-bold text-[9px] hover:bg-red-500 hover:text-black transition-all rounded cursor-pointer uppercase tracking-wider font-mono animate-pulse"
                >
                    [ EXIT GAME ]
                </button>

                <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18181b] border border-black" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18181b] border border-black" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18181b] border border-black" />
                </div>
                <span>CONTRAST: AUTO</span>
            </div>
        </div>
    );
};



const DiagnosticsLog: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    
    useEffect(() => {
        const initialLogs = [
            'SYS_BOOT: OK',
            'MEM_SIZE: 640KB',
            'VIDEO: MONO_CRT',
            'GAME_DRV: SNAKE.EXE',
            'AI_ENG: BFS_V2'
        ];
        setLogs(initialLogs);

        const messages = [
            'READ: 0x3A2B',
            'WRITE: 0x4F10',
            'TICK: CPU_0',
            'AI_CALC: PATH_SAFE',
            'AUDIO_OUT: CH_0',
            'SYS_TEMP: 38C',
            'DMA_ACK: 0x03',
            'REG_AX: 0x00FF',
            'REG_BX: 0x0A12',
            'INTERRUPT: 0x21',
        ];

        const interval = setInterval(() => {
            setLogs(prev => {
                const nextMsg = messages[Math.floor(Math.random() * messages.length)];
                const timestamp = new Date().toLocaleTimeString().split(' ')[0];
                const newLogs = [...prev, `[${timestamp}] ${nextMsg}`];
                if (newLogs.length > 18) newLogs.shift();
                return newLogs;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden lg:flex flex-col font-mono text-[8px] text-[var(--fg-muted)] border border-[var(--border-default)] bg-[#030303] p-2 h-[720px] w-[140px] select-none justify-between overflow-hidden shrink-0" style={{ borderRadius: 'var(--radius-sm)' }}>
            <div>
                <div className="border-b border-[var(--border-default)] pb-1 mb-2 text-[9px] font-bold text-[var(--fg-secondary)] uppercase">
                    SYS_DIAG.LOG
                </div>
                <div className="space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="truncate tracking-tight">{log}</div>
                    ))}
                </div>
            </div>
            <div className="pt-2 border-t border-[var(--border-default)] text-[7px] text-[var(--fg-muted)] animate-pulse uppercase">
                STATUS: TELEMETRY_OK
            </div>
        </div>
    );
};

const AsciiEqualizer: React.FC = () => {
    const [bars, setBars] = useState<number[]>([4, 6, 2, 8, 5, 7, 3]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.floor(Math.random() * 8) + 1));
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden lg:flex flex-col font-mono text-[9px] text-[var(--fg-muted)] border border-[var(--border-default)] bg-[#030303] p-2 h-[720px] w-[140px] select-none justify-between overflow-hidden shrink-0" style={{ borderRadius: 'var(--radius-sm)' }}>
            <div>
                <div className="border-b border-[var(--border-default)] pb-1 mb-2 text-[9px] font-bold text-[var(--fg-secondary)] uppercase">
                    SOUND_TEST.EQ
                </div>
                <div className="flex justify-between items-end h-[140px] px-1 bg-black/40 py-2 border border-[var(--border-default)]">
                    {bars.map((height, idx) => (
                        <div key={idx} className="flex flex-col-reverse gap-0.5 items-center w-2">
                            {Array.from({ length: 9 }).map((_, level) => {
                                const active = level < height;
                                return (
                                    <div 
                                        key={level} 
                                        className={`w-full h-1 transition-colors duration-75 ${
                                            active ? 'bg-[var(--fg-secondary)]' : 'bg-transparent'
                                        }`} 
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="space-y-1 text-[7px]">
                <div>CH1: L-OUT |||||| 75%</div>
                <div>CH2: R-OUT |||||| 75%</div>
                <div>SYNTH: sound.ts</div>
            </div>

            <div className="pt-2 border-t border-[var(--border-default)] text-[7px] text-[var(--fg-muted)] uppercase">
                SAMPLING: 44.1KHZ
            </div>
        </div>
    );
};

interface GameItem {
    id: string;
    name: string;
    size: string;
    status: 'PLAYABLE' | 'OFFLINE';
    details: string;
}

const GAMES: GameItem[] = [
    { id: 'snake', name: 'SNAKE.EXE', size: '14.2 KB', status: 'PLAYABLE', details: 'Monochrome snake module with score tracking and synthesized sounds.' },
    { id: 'tetris', name: 'TETRIS.EXE', size: '28.4 KB', status: 'OFFLINE', details: 'Classical block-fitting puzzle system. Block calibration locked.' },
    { id: 'doom', name: 'DOOM.EXE', size: '640.0 KB', status: 'OFFLINE', details: 'Fictional 3D doom clone. Requires 4MB EMS expanded memory.' },
];

const GamePage: React.FC = () => {
    const [gameState, setGameState] = useState<'select' | 'loading' | 'playing'>('select');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const activeGame = GAMES[selectedIdx];

    // Local keyboard event handler (Catalog selection & Escape back to menu)
    const handleSelectKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            if (gameState === 'playing' || gameState === 'loading') {
                playLaunchChime();
                setGameState('select');
            }
            return;
        }

        if (gameState !== 'select') return;

        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            e.preventDefault();
            playTickChime();
            setSelectedIdx(prev => (prev + 1) % GAMES.length);
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            e.preventDefault();
            playTickChime();
            setSelectedIdx(prev => (prev - 1 + GAMES.length) % GAMES.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeGame.status === 'PLAYABLE') {
                triggerLaunchGame();
            }
        }
    }, [gameState, selectedIdx, activeGame]);

    useEffect(() => {
        window.addEventListener('keydown', handleSelectKeyDown);
        return () => window.removeEventListener('keydown', handleSelectKeyDown);
    }, [handleSelectKeyDown]);

    // Launch game sequence: Select -> Loading -> Playing
    const triggerLaunchGame = () => {
        playLaunchChime();
        setGameState('loading');
        setLoadingProgress(0);
    };

    // Animate fake retro boot progress bar
    useEffect(() => {
        if (gameState !== 'loading') return;

        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const next = prev + Math.floor(Math.random() * 15) + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setGameState('playing');
                        playLaunchChime();
                    }, 250);
                    return 100;
                }
                playTickChime();
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [gameState]);

    return (
        <div
            className={`motion-page mx-auto transition-all duration-300 flex flex-col ${gameState === 'playing' ? 'max-w-4xl h-full gap-3' : 'max-w-2xl space-y-8'}`}
        >
            {/* Header */}
            <header>
                <div className="text-[10px] text-[var(--fg-muted)] mb-2">&gt; LOAD GAME_MODULE.EXE...</div>
                <h1 className="font-pixel text-base sm:text-lg uppercase tracking-[0.03em] text-[var(--fg-primary)]">
                    <AsciiTextLoader text="RETRO ARCADE MODULE" delay={50} speed={25} />
                </h1>
                <p className="mt-2 text-xs text-[var(--fg-secondary)]">
                    Boot interactive programs directly inside the sandbox cabinet.
                </p>
                <div className="mt-3 h-px bg-[var(--border-default)]" />
            </header>

            {/* Cabinet frame container */}
            <div
                className={`border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden ${gameState === 'playing' ? 'flex flex-col flex-1 min-h-0' : ''}`}
                style={{ borderRadius: 'var(--radius-md)' }}
            >
                <div className="p-2 border-b border-[var(--border-default)] bg-[var(--bg-muted)] flex justify-between items-center select-none text-[8px] text-[var(--fg-muted)] font-mono min-h-[34px] shrink-0">
                    <div className="flex items-center gap-2">
                        <span>┌─ CABINET_CHANNEL ─┐</span>
                        {gameState === 'playing' && (
                            <span className="text-emerald-500 animate-pulse font-bold tracking-wider">● ACTIVE: SNAKE.EXE</span>
                        )}
                    </div>
                    {gameState === 'playing' ? (
                        <button
                            onClick={() => {
                                playLaunchChime();
                                setGameState('select');
                            }}
                            className="text-[9px] uppercase border border-red-900/50 bg-red-950/20 text-red-400 px-2 py-0.5 hover:bg-red-500 hover:text-black hover:border-red-500 transition-all cursor-pointer font-bold font-mono"
                            style={{ borderRadius: 'var(--radius-sm)' }}
                        >
                            [ DISCONNECT / ESC ]
                        </button>
                    ) : (
                        <span>ONLINE</span>
                    )}
                </div>

                {/* ───── VIEWPORT ROUTING ───── */}
                <div className={`flex items-center justify-center transition-all duration-200 ${gameState === 'playing' ? 'p-2 flex-1 min-h-0' : 'p-6 min-h-[380px]'}`}>
                    
                    {/* state 1: SELECT CATALOG MENU */}
                    {gameState === 'select' && (
                        <div className="w-full flex flex-col font-mono">
                            {/* Centered NES Logo Header */}
                            <pre className="text-[6px] sm:text-[7px] text-[var(--fg-muted)] leading-none mx-auto select-none mb-6">
{`
 _  _ ___ ___  ___    _   ___   ___   _   ___  ___ 
| \\| | __/ __|/ _ \\  /_\\ | _ \\ / __| /_\\ |   \\| __|
| .  | _|\\__ \\ (_) |/ _ \\|   /| (__ / _ \\| |) | _| 
|_|\\_|_| |___/\\___//_/   \\_\\_\\\\___/_/   \\_\\___/|___|
`}
                            </pre>

                            {/* Arcade Listings Box */}
                            <div className="border border-[var(--border-default)] bg-[var(--bg-primary)] p-1">
                                {GAMES.map((game, index) => {
                                    const isSelected = selectedIdx === index;
                                    const isPlayable = game.status === 'PLAYABLE';
                                    
                                    return (
                                        <div
                                            key={game.id}
                                            onClick={() => {
                                                if (isSelected) {
                                                    if (isPlayable) {
                                                        triggerLaunchGame();
                                                    }
                                                } else {
                                                    playTickChime();
                                                    setSelectedIdx(index);
                                                }
                                            }}
                                            className={`p-3 text-xs flex items-center justify-between cursor-pointer border-b border-[var(--border-default)] last:border-b-0 transition-colors select-none ${
                                                isSelected 
                                                    ? 'bg-[var(--fg-primary)] text-[var(--fg-inverse)] font-bold' 
                                                    : 'text-[var(--fg-secondary)] hover:bg-[var(--bg-muted)]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 text-center text-[10px]">
                                                    {isSelected ? '▶' : ' '}
                                                </span>
                                                <span className="tracking-wide">{game.name}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className={`text-[8px] uppercase tracking-normal opacity-85`}>
                                                    {game.size}
                                                </span>

                                                {isPlayable ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedIdx(index);
                                                            triggerLaunchGame();
                                                        }}
                                                        className={`text-[9px] font-bold border px-2 py-0.5 tracking-wider transition-colors cursor-pointer uppercase ${
                                                            isSelected 
                                                                ? 'bg-[var(--fg-inverse)] text-[var(--fg-primary)] border-[var(--fg-inverse)]' 
                                                                : 'border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--fg-inverse)]'
                                                        }`}
                                                    >
                                                        [ BOOT ]
                                                    </button>
                                                ) : (
                                                    <span className={`text-[8px] border px-1.5 py-0.5 uppercase ${
                                                        isSelected ? 'border-[var(--fg-inverse)] opacity-80' : 'border-[var(--border-default)] text-[var(--fg-muted)]'
                                                    }`}>
                                                        LOCKED
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Active Game Details Description */}
                            <div className="mt-4 border border-[var(--border-default)] p-3 min-h-[64px] text-[10px] text-[var(--fg-secondary)] flex justify-between items-center gap-4">
                                <div className="flex-1">
                                    <span className="text-[8px] text-[var(--fg-muted)] uppercase block mb-1">
                                        [ DESCRIPTION ]
                                    </span>
                                    <AsciiTextLoader text={activeGame.details} key={activeGame.id} delay={0} speed={15} />
                                </div>
                                {activeGame.status === 'PLAYABLE' && (
                                    <button
                                        onClick={triggerLaunchGame}
                                        className="shrink-0 text-[10px] font-bold border border-[var(--border-strong)] px-3 py-1.5 bg-[var(--fg-primary)] text-[var(--fg-inverse)] hover:opacity-85 transition-opacity cursor-pointer uppercase tracking-wider font-mono"
                                    >
                                        [ LAUNCH GAME ]
                                    </button>
                                )}
                            </div>

                            {/* Interactive Guide Footer */}
                            <div className="mt-4 text-center text-[9px] text-[var(--fg-muted)] uppercase tracking-wider select-none animate-pulse">
                                [↑↓] NAVIGATE MENU   [ENTER/CLICK AGAIN] LOAD MODULE
                            </div>
                        </div>
                    )}

                    {/* state 2: SYSTEM BOOTING / LOADING BAR */}
                    {gameState === 'loading' && (
                        <div className="w-full max-w-sm flex flex-col font-mono text-[10px] text-[var(--fg-secondary)] space-y-4">
                            <div className="space-y-1">
                                <div>&gt; MOUNTING SECTORS: OK</div>
                                <div>&gt; INJECTING MEMORY: {activeGame.size}</div>
                                <div>&gt; INITALIZING GRAPHIC PORT: MONOCHROME</div>
                                <div>&gt; EXEC: {activeGame.name}</div>
                            </div>

                            {/* Loading Bar progress */}
                            <div className="space-y-2 pt-2 border-t border-[var(--border-default)]">
                                <div className="flex justify-between select-none">
                                    <span>DECOMPRESSING MODULES:</span>
                                    <span>{loadingProgress}%</span>
                                </div>
                                <div className="h-4 bg-[var(--bg-primary)] border border-[var(--border-strong)] relative overflow-hidden select-none">
                                    <div 
                                        className="h-full bg-[var(--fg-primary)] transition-all duration-75"
                                        style={{ width: `${loadingProgress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* state 3: PLAYING ENVIRONMENT */}
                    {gameState === 'playing' && (
                        <div className="w-full flex justify-center items-center gap-4 p-4 bg-[#0d0d0f]">
                            <DiagnosticsLog />
                            <div className="flex-1 max-w-xl">
                                {activeGame.id === 'snake' ? (
                                    <SnakeGame onBack={() => {
                                        playLaunchChime();
                                        setGameState('select');
                                    }} />
                                ) : (
                                    <div className="text-center font-mono space-y-4 py-8">
                                        <div className="text-xs text-[var(--fg-primary)] font-bold uppercase tracking-wider animate-pulse">
                                            MODULE ERROR
                                        </div>
                                        <p className="text-[10px] text-[var(--fg-secondary)] max-w-xs mx-auto">
                                            Unimplemented game engine. Module offline.
                                        </p>
                                        <Button 
                                            onClick={() => {
                                                playLaunchChime();
                                                setGameState('select');
                                            }} 
                                            variant="retro" 
                                            size="sm"
                                        >
                                            [ ESCAPE ]
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <AsciiEqualizer />
                        </div>
                    )}

                </div>

                <div className={`p-2 border-t border-[var(--border-default)] bg-[var(--bg-muted)] text-[8px] text-[var(--fg-muted)] font-mono flex justify-between select-none ${gameState === 'playing' ? 'hidden' : ''}`}>
                    <span>SECTOR_LOAD: OK</span>
                    <span>SYSTEM CORE 640KB</span>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
