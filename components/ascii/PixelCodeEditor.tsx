import { useEffect, useRef, useState, useMemo } from 'react';
import { SadFaceIcon } from './JulesIcons';

const INITIAL_CODE = `// Objective: Build scalable Flutter & Kotlin Multiplatform apps

class RupeshJadhav {
  final String name = 'Rupesh Jadhav';
  final String role = 'Senior Mobile Architect';
  final String location = 'Mumbai, India';

  final List<String> stack = const [
    'Flutter',
    'Dart',
    'Kotlin',
    'KMP',
  ];

  final int experienceYears = 5;

  // TODO: Add production client apps
  Future<void> shipFeatures() async {
    // Target: 60fps native performance
    print('Deploying with Clean Architecture');
  }
}

void main() async {
  final rupesh = RupeshJadhav();
  await rupesh.shipFeatures();
}`;

function escapeHtml(d: string): string {
  if (typeof d !== 'string') return '';
  return d
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const tokenRegexes = [
  { type: 'comment', regex: /(\/\/.*)/g },
  { type: 'comment', regex: /(\/\*[\s\S]*?\*\/)/g },
  { type: 'string', regex: /(".*?"|'.*?'|`.*?`)/g },
  {
    type: 'keyword',
    regex: /\b(final|const|var|class|void|async|await|return|if|else|for|while|import|export|new|this|true|false|null|extends|implements|mixin|abstract|static|late|required|override|get|set)\b/g,
  },
  {
    type: 'type',
    regex: /\b(String|List|Map|Set|int|double|bool|Future|Stream|dynamic|Object|Duration|Widget|BuildContext|RupeshJadhav)\b/g,
  },
  { type: 'functionName', regex: /(\b[a-zA-Z_]\w*)(?=\s*\()/g },
  { type: 'number', regex: /\b(\d+(\.\d+)?)\b/g },
  { type: 'punctuation', regex: /([{}()[\].,:;<>])/g },
  { type: 'operator', regex: /([+\-*/%&|^~!=]=?=?)/g },
];

const syntaxColors: Record<string, string> = {
  comment: 'text-[#a855f7]',
  keyword: 'text-[#ff79c6]',
  type: 'text-[#0fd3d3]',
  string: 'text-[#fcd34d]',
  number: 'text-[#d8b4fe]',
  functionName: 'text-[#d8b4fe]',
  operator: 'text-[#d8b4fe]',
  punctuation: 'text-[#fffbeb]',
  variable: 'text-[#fffbeb]',
};

function highlightLine(line: string): string {
  if (line.trim() === '') return ' ';
  const matches: { type: string; start: number; end: number; content: string }[] = [];
  tokenRegexes.forEach(tok => {
    const reg = new RegExp(tok.regex);
    let match;
    while ((match = reg.exec(line)) !== null) {
      matches.push({
        type: tok.type,
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
      });
    }
  });

  matches.sort((a, b) =>
    a.start === b.start ? b.end - b.start - (a.end - a.start) : a.start - b.start
  );

  const nonOverlapping: typeof matches = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      nonOverlapping.push(m);
      lastEnd = m.end;
    }
  }

  let res = '';
  let curr = 0;
  nonOverlapping.forEach(m => {
    if (m.start > curr) res += escapeHtml(line.substring(curr, m.start));
    const cls = syntaxColors[m.type] || syntaxColors.variable;
    res += `<span class="${cls}">${escapeHtml(m.content)}</span>`;
    curr = m.end;
  });
  if (curr < line.length) res += escapeHtml(line.substring(curr));
  return res || ' ';
}

type SquidState = 'moving' | 'thinking' | 'editing' | 'idle';
const TOTAL_VIEWPORT_LINES = 32;

export default function PixelCodeEditor() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [squidPos, setSquidPos] = useState({ x: 71, y: 418 });
  const [squidState, setSquidState] = useState<SquidState>('thinking');
  const [activeInkingLine, setActiveInkingLine] = useState<number | null>(null);
  const isMounted = useRef(true);

  const getLinePos = (line: number) => ({
    x: 71,
    y: 34 + (line - 1) * 24,
  });

  useEffect(() => {
    isMounted.current = true;

    const sleep = (ms: number) =>
      new Promise<boolean>(resolve => {
        const t = setTimeout(() => {
          resolve(isMounted.current);
        }, ms);
        return () => clearTimeout(t);
      });

    const runAnimation = async () => {
      while (isMounted.current) {
        // Step 1: Reset to initial clean Dart code
        setCode(INITIAL_CODE);
        setActiveInkingLine(null);
        setSquidPos(getLinePos(17));
        setSquidState('thinking');
        if (!(await sleep(2200))) return;

        // Step 2: Squid edits line 17 with production client apps list
        setSquidState('editing');
        const targetLine = "  final List<String> apps = const ['HDFC Smart Now', 'ICICI', 'Axis Mobile'];";
        const editLineIdx = 16; // line 17 is index 16

        for (let i = 1; i <= targetLine.length; i++) {
          if (!isMounted.current) return;
          const chunk = targetLine.substring(0, i);
          setCode(prev => {
            const l = prev.split('\n');
            if (l.length > editLineIdx) {
              l[editLineIdx] = chunk;
            }
            return l.join('\n');
          });
          if (!(await sleep(20))) return;
        }

        setActiveInkingLine(17);
        if (!(await sleep(600))) return;
        setActiveInkingLine(null);

        // Step 3: Move squid to line 20 and update print statement
        setSquidPos(getLinePos(20));
        setSquidState('moving');
        if (!(await sleep(400))) return;
        setSquidState('thinking');
        if (!(await sleep(600))) return;
        setSquidState('editing');

        const updatedPrint = "    print('Shipped: ' + apps.join(' • '));";
        const printLineIdx = 19; // line 20 is index 19

        for (let i = 10; i <= updatedPrint.length; i++) {
          if (!isMounted.current) return;
          const chunk = updatedPrint.substring(0, i);
          setCode(prev => {
            const l = prev.split('\n');
            if (l.length > printLineIdx) {
              l[printLineIdx] = chunk;
            }
            return l.join('\n');
          });
          if (!(await sleep(18))) return;
        }

        setActiveInkingLine(20);
        if (!(await sleep(700))) return;
        setActiveInkingLine(null);

        // Step 4: Rest in idle
        setSquidState('idle');
        if (!(await sleep(5000))) return;
      }
    };

    runAnimation();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const rawLines = useMemo(() => code.split('\n'), [code]);
  const lines = useMemo(() => {
    const list = [...rawLines];
    while (list.length < TOTAL_VIEWPORT_LINES) {
      list.push('');
    }
    return list;
  }, [rawLines]);

  const highlightedLines = useMemo(() => lines.map(highlightLine), [lines]);
  const isThinking = squidState === 'thinking';

  return (
    <div className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto -mt-4 min-h-[37vh] md:min-h-[65vh]">
      {/* 1. Main Code Editor Window inside Purple Dither Frame */}
      <div className="w-full relative">
        <div className="w-full md:pattern-square-light bg-size-[1.4em] bg-repeat p-4 rounded-pixel-lg relative z-10">
          <div
            className="bg-[#130825] p-4 py-6 text-sm md:p-6 relative rounded-pixel-sm font-mono overflow-hidden max-w-full"
            style={{ lineHeight: '24px', minHeight: '768px' }}
          >
            {/* Squid Agent with Thought Bubble */}
            <div
              className="absolute opacity-100 w-12 h-12 md:w-16 md:h-16 pointer-events-none"
              style={{
                left: 0,
                top: 0,
                transform: `translate(${squidPos.x}px, ${squidPos.y}px) translate(-100%, -90%)`,
                transition: `transform ${squidState === 'moving' ? '700ms' : '300ms'} ease-in-out, opacity 300ms ease-in-out`,
                zIndex: 20,
              }}
            >
              {/* Thought bubble popping up above the squid */}
              <div
                aria-label="Thinking"
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none transition-all duration-300 ${
                  isThinking
                    ? 'opacity-100 animate-thinking-bubble-appear'
                    : 'opacity-0 animate-thinking-bubble-disappear'
                }`}
                style={{ zIndex: 30 }}
              >
                <span className="animate-pixel-thought-bubble relative block">
                  <img
                    src="/jules/thought-bubble.png"
                    alt="Thinking"
                    width={24}
                    height={24}
                    className="w-6 h-6 pixelated-img"
                  />
                </span>
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#784fcf] opacity-80" />
              </div>

              {/* Pixelated Squid Sprite */}
              <img
                src="/jules/jules-pixelated.png"
                alt="Squid agent"
                width={48}
                height={48}
                loading="eager"
                className={`aspect-square will-change-opacity will-change-transform pixelated-img w-full h-full ${
                  squidState === 'thinking'
                    ? 'animate-squid-thinking'
                    : squidState === 'editing'
                    ? 'animate-pulse'
                    : 'animate-squid-idle'
                }`}
              />
            </div>

            {/* Code Lines with Authentic Jules Line Numbers and Inking Tentacles */}
            <div className="code-content relative text-amber-50 select-text overflow-x-auto max-w-full">
              {lines.map((lineStr, idx) => {
                const lineNum = idx + 1;
                const isInking = activeInkingLine === lineNum;
                return (
                  <div
                    key={`line-${idx}`}
                    className={`flex relative ${isInking ? 'animate-link-ink-flash' : ''}`}
                  >
                    <span className="select-none text-right w-10 pr-4 text-[#7c3aed] flex-shrink-0 hidden md:block font-mono text-sm leading-[24px]">
                      {lineNum}
                    </span>
                    <div className="absolute top-0 left-0 w-full h-full overflow-x-hidden pointer-events-none">
                      <div className="tentacle pattern-tentacle opacity-0 w-[110%] h-full -translate-[10%]" />
                    </div>
                    <pre className="whitespace-pre flex-grow relative font-mono text-[13px] md:text-sm leading-[24px]">
                      <code dangerouslySetInnerHTML={{ __html: highlightedLines[idx] || ' ' }} />
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Jules Task Card on the Right */}
      <div className="md:pattern-square-light bg-size-[1.4em] md:!absolute md:top-1/2 md:right-0 md:-translate-y-1/2 xl:translate-x-1/2 hidden md:block pb-4 pr-4 z-40 rounded-pixel-lg">
        <div className="md:max-w-[300px] relative z-12">
          <div className="p-6 md:border-4 rounded-pixel-sm bg-[#130825] text-purple-200 border-[#28124f]">
            <div className="p-8 md:p-0 flex flex-col items-center justify-center w-full h-full text-center">
              <span className="center hidden md:block mb-4">
                <SadFaceIcon className="text-purple-400 w-12 h-12" />
              </span>
              <p className="text-purple-50 mb-6 text-center text-sm font-mono leading-relaxed">
                5+ years shipping apps that{' '}
                <span className="font-black border-b-2 pb-0.5 border-purple-400">users love</span>.
              </p>
              <div className="my-2 text-center flex flex-wrap justify-center gap-2">
                <span className="text-xs inline-block font-bold p-1 px-2 bg-fuchsia-400 border-b-2 border-fuchsia-600 text-fuchsia-950 font-mono">Flutter</span>
                <span className="text-xs inline-block font-bold p-1 px-2 bg-cyan-400 border-b-2 border-cyan-500 text-cyan-950 font-mono">Kotlin / KMP</span>
                <span className="text-xs inline-block font-bold p-1 px-2 bg-amber-400 border-b-2 border-amber-500 text-amber-950 font-mono">Clean Arch</span>
                <span className="text-xs inline-block font-bold p-1 px-2 bg-purple-400 border-b-2 border-purple-500 text-purple-950 font-mono">CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Task Card */}
      <div className="mt-4 md:hidden pattern-square-light p-3 rounded-pixel-lg">
        <div className="p-5 bg-[#130825] text-purple-200 text-center border-4 border-[#28124f] rounded-pixel-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <SadFaceIcon className="text-purple-400 w-8 h-8" />
            <p className="text-xs font-mono text-purple-50">
              5+ years shipping apps that <span className="underline font-bold">users love</span>.
            </p>
          </div>
          <div className="my-2 text-center flex flex-wrap justify-center gap-2">
            <span className="text-xs inline-block font-bold p-1.5 px-2.5 bg-fuchsia-400 border-b-2 border-fuchsia-600 text-fuchsia-950 font-mono">Flutter</span>
            <span className="text-xs inline-block font-bold p-1.5 px-2.5 bg-cyan-400 border-b-2 border-cyan-500 text-cyan-950 font-mono">Kotlin / KMP</span>
            <span className="text-xs inline-block font-bold p-1.5 px-2.5 bg-amber-400 border-b-2 border-amber-500 text-amber-950 font-mono">Clean Arch</span>
            <span className="text-xs inline-block font-bold p-1.5 px-2.5 bg-purple-400 border-b-2 border-purple-500 text-purple-950 font-mono">CI/CD</span>
          </div>
        </div>
      </div>

      {/* Authentic Sticky Mobile Status Bar matching Jules */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#3b1275]/95 backdrop-blur-sm px-4 py-2 text-purple-100 flex items-center justify-between border-t-2 border-[#784fcf] z-50 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <img
            src="/jules/jules-pixelated.png"
            alt="Agent mascot"
            width={28}
            height={28}
            className={`w-7 h-7 pixelated-img ${
              squidState === 'thinking'
                ? 'animate-squid-thinking'
                : squidState === 'editing'
                ? 'animate-pulse'
                : 'animate-squid-idle'
            }`}
          />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {squidState === 'thinking'
              ? 'Analysing Dart architecture...'
              : squidState === 'editing'
              ? 'Refactoring mobile modules...'
              : 'Architecture verified. ✓'}
          </span>
        </div>
        <a
          href="#plans"
          className="text-xs font-mono bg-[#0FD3D3] hover:bg-cyan-300 text-cyan-950 font-bold px-2.5 py-1 rounded-pixel-sm transition-colors"
        >
          Tiers ↓
        </a>
      </div>
    </div>
  );
}
