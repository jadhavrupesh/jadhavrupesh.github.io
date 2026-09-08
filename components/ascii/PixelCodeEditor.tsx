import { useEffect, useRef, useState, type ReactElement } from 'react';
import { personalInfo } from '../../constants';

// Each line is a list of colored tokens. The editor "types" the whole block
// character by character, then holds and restarts, mimicking the Jules editor.
type Token = { text: string; cls?: string };
const LINES: Token[][] = [
  [{ text: '// Good ideas deserve great apps.', cls: 'code-comment' }],
  [{ text: 'class ', cls: 'code-pink' }, { text: 'Rupesh ', cls: 'code-yellow' }, { text: 'extends ', cls: 'code-pink' }, { text: 'MobileDeveloper', cls: 'code-yellow' }, { text: ' {' }],
  [{ text: '  final ', cls: 'code-pink' }, { text: 'location = ' }, { text: `'${personalInfo.location}'`, cls: 'code-cyan' }, { text: ';' }],
  [{ text: '  final ', cls: 'code-pink' }, { text: 'experience = ' }, { text: "'5+ years'", cls: 'code-cyan' }, { text: ';' }],
  [{ text: '  final ', cls: 'code-pink' }, { text: 'stack = [' }, { text: "'Flutter', 'Android', 'KMP'", cls: 'code-cyan' }, { text: '];' }],
  [{ text: ' ' }],
  [{ text: '  Future', cls: 'code-yellow' }, { text: '<' }, { text: 'App', cls: 'code-yellow' }, { text: '> ' }, { text: 'build', cls: 'code-purple' }, { text: '(' }, { text: 'Idea', cls: 'code-yellow' }, { text: ' idea) ' }, { text: 'async', cls: 'code-pink' }, { text: ' {' }],
  [{ text: '    return ', cls: 'code-pink' }, { text: 'craft(idea, architecture: ' }, { text: "'clean'", cls: 'code-cyan' }, { text: ');' }],
  [{ text: '  }' }],
  [{ text: '}' }],
];

const CHARS_PER_TICK = 2;
const TICK_MS = 45;
const HOLD_MS = 2600;

export default function PixelCodeEditor() {
  const [count, setCount] = useState(0);
  const totalChars = useRef(LINES.reduce((sum, line) => sum + line.reduce((s, t) => s + t.text.length, 0), 0));
  const done = count >= totalChars.current;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setCount(totalChars.current); return; }

    let timer: ReturnType<typeof setTimeout>;
    if (!done) {
      timer = setTimeout(() => setCount(c => Math.min(totalChars.current, c + CHARS_PER_TICK)), TICK_MS);
    } else {
      timer = setTimeout(() => setCount(0), HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [count, done]);

  // Walk tokens and reveal only the first `count` characters.
  let budget = count;
  const rendered = LINES.map((line, lineIndex) => {
    const parts: ReactElement[] = [];
    let lineHasContent = false;
    for (let i = 0; i < line.length; i++) {
      const token = line[i];
      if (budget <= 0) break;
      const slice = token.text.slice(0, budget);
      budget -= slice.length;
      if (slice) lineHasContent = true;
      parts.push(<span key={i} className={token.cls}>{slice}</span>);
    }
    // Only render lines that have started, to grow the block naturally.
    if (!lineHasContent && lineIndex > 0 && budget <= 0 && count < totalChars.current) return null;
    return (
      <div className="pixel-code-line" key={lineIndex}>
        <code>{parts.length ? parts : <span> </span>}</code>
      </div>
    );
  }).filter(Boolean);

  return (
    <div className="pixel-code" aria-label="Developer profile">
      {rendered}
      <span className="pixel-code-caret" aria-hidden="true" />
    </div>
  );
}
