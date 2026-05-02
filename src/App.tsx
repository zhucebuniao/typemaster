import { useMemo, useRef, useState } from 'react'

type Page = 'home' | 'playground' | 'glyphs' | 'gallery' | 'about'
type Preset = 'readable' | 'poetic' | 'wild' | 'custom'

type Settings = {
  abstractness: number
  lineWobble: number
  symbolDensity: number
  colorIntensity: number
}

type SymbolShape = 'dot' | 'star' | 'moon' | 'eye'

type Composition = {
  lines: { path: string; color: string; width: number }[]
  symbols: { shape: SymbolShape; x: number; y: number; size: number; color: string }[]
  blobs: { cx: number; cy: number; rx: number; ry: number; color: string; opacity: number }[]
}

const CANVAS = { width: 1200, height: 1600 }
const MAX_TEXT_LENGTH = 24
const DEFAULT_TEXT = 'LOVE'
const ALLOWED_TEXT_REGEX = /[^A-Za-z0-9.,!?:;\-/\s]/g

const PRESETS: Record<Exclude<Preset, 'custom'>, Settings> = {
  readable: { abstractness: 20, lineWobble: 30, symbolDensity: 20, colorIntensity: 40 },
  poetic: { abstractness: 50, lineWobble: 60, symbolDensity: 50, colorIntensity: 65 },
  wild: { abstractness: 80, lineWobble: 85, symbolDensity: 80, colorIntensity: 90 },
}

const PAGES: Page[] = ['home', 'playground', 'glyphs', 'gallery', 'about']
const GALLERY_CASES = ['LOVE', 'DREAM', 'PLAY', 'TYPE', 'FAR AWAY', 'NO HOME', 'LOW SKY', 'BLUE BIRD', 'THE FUTURE', 'POETIC CODE', 'SILENT SUN', 'FLOATING LINE']
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?:;-/'.split('')
const PALETTE = { paper: '#F5EEDC', ink: '#111111', red: '#E3342F', yellow: '#F7C948', blue: '#1E5EFF', green: '#2FA84F' }

function hashSeed(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function createRand(seed: number) {
  let value = seed || 1
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 0xffffffff
  }
}

function jitter(x: number, amount: number, rand: () => number) {
  return x + (rand() - 0.5) * amount
}

function glyphPath(char: string): string {
  const c = char.toUpperCase()
  if (c === 'O' || c === '0') return 'M50,10 C75,10 90,25 90,50 C90,75 75,90 50,90 C25,90 10,75 10,50 C10,25 25,10 50,10 Z'
  if (c === 'L') return 'M20,10 L20,90 L80,90'
  if (c === 'V') return 'M10,10 L50,90 L90,10'
  if (c === 'E') return 'M80,10 L20,10 L20,90 L80,90 M20,50 L65,50'
  if (c === 'A') return 'M10,90 L50,10 L90,90 M30,58 L70,58'
  if (c === 'I') return 'M50,10 L50,90'
  if (c === 'S') return 'M80,20 C55,0 20,20 40,45 C55,65 85,55 75,85 C55,100 30,90 20,70'
  if (c === ' ') return ''
  return 'M20,10 L80,10 L80,90 L20,90 Z'
}

function sanitizeText(value: string) {
  return value.replace(ALLOWED_TEXT_REGEX, '').slice(0, MAX_TEXT_LENGTH)
}

function generateComposition(text: string, seed: number, settings: Settings): Composition {
  const rand = createRand(hashSeed(`${text}-${seed}`))
  const chars = sanitizeText(text || DEFAULT_TEXT).split('')
  const wobble = (settings.lineWobble / 100) * 12
  const abstractShift = (settings.abstractness / 100) * 36
  const saturation = Math.max(35, settings.colorIntensity)

  const lines: Composition['lines'] = []
  const symbols: Composition['symbols'] = []
  const blobs: Composition['blobs'] = []

  const columns = Math.min(Math.max(chars.length, 1), 7)
  const charBox = (CANVAS.width - 220) / columns

  chars.forEach((char, idx) => {
    const basePath = glyphPath(char)
    if (!basePath) return

    const gx = 110 + (idx % columns) * charBox + (rand() - 0.5) * abstractShift
    const gy = 240 + Math.floor(idx / columns) * 260 + (rand() - 0.5) * abstractShift
    const scale = 1.9 + rand() * 0.3

    lines.push({
      path: basePath.replace(/(\d+),(\d+)/g, (_, x, y) => `${jitter(gx + Number(x) * scale, wobble, rand)},${jitter(gy + Number(y) * scale, wobble, rand)}`),
      color: PALETTE.ink,
      width: 5,
    })

    const localSymbols = Math.floor(1 + (settings.symbolDensity / 100) * 4)
    for (let s = 0; s < localSymbols; s += 1) {
      symbols.push({
        shape: (['dot', 'star', 'moon', 'eye'] as const)[Math.floor(rand() * 4)],
        x: gx + 90 + (rand() - 0.5) * 200,
        y: gy + 95 + (rand() - 0.5) * 210,
        size: 10 + rand() * 34,
        color: [PALETTE.red, PALETTE.yellow, PALETTE.blue, PALETTE.green][Math.floor(rand() * 4)],
      })
    }

    if (rand() > 0.35) {
      blobs.push({
        cx: gx + 90 + (rand() - 0.5) * 180,
        cy: gy + 100 + (rand() - 0.5) * 180,
        rx: 28 + rand() * 80,
        ry: 20 + rand() * 56,
        color: [PALETTE.red, PALETTE.yellow, PALETTE.blue][Math.floor(rand() * 3)],
        opacity: 0.16 + saturation / 250,
      })
    }
  })

  return { lines, symbols, blobs }
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [text, setText] = useState(DEFAULT_TEXT)
  const [preset, setPreset] = useState<Preset>('poetic')
  const [settings, setSettings] = useState<Settings>(PRESETS.poetic)
  const [seed, setSeed] = useState(Date.now())
  const svgRef = useRef<SVGSVGElement | null>(null)

  const composition = useMemo(() => generateComposition(text, seed, settings), [text, seed, settings])

  const applyPreset = (next: Exclude<Preset, 'custom'>) => {
    setPreset(next)
    setSettings(PRESETS[next])
  }

  const updateSetting = (key: keyof Settings, value: number) => {
    setPreset('custom')
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const goPlayground = (sample?: string) => {
    if (sample) setText(sample)
    setPage('playground')
    setSeed(Date.now())
  }

  const exportSvg = () => {
    if (!svgRef.current) return
    const blob = new Blob([new XMLSerializer().serializeToString(svgRef.current)], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'miro-type-poster.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPng = () => {
    if (!svgRef.current) return
    const svgBlob = new Blob([new XMLSerializer().serializeToString(svgRef.current)], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = CANVAS.width
      canvas.height = CANVAS.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'miro-type-poster.png'
      a.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <main className="app">
      <header className="panel topbar">
        <h1>Miró Type Playground</h1>
        <nav>
          {PAGES.map((item) => (
            <button key={item} className={page === item ? 'active' : ''} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      {page === 'home' && (
        <section className="panel page">
          <h2>A playful experimental type system</h2>
          <p>Inspired by symbolic abstraction, hand-drawn lines, and poetic visual rhythm.</p>
          <div className="action-row home-actions">
            <button onClick={() => goPlayground()}>Start Creating</button>
            <button onClick={() => setPage('glyphs')}>Explore Glyphs</button>
          </div>
        </section>
      )}

      {page === 'playground' && (
        <section className="workspace">
          <aside className="panel controls">
            <label htmlFor="text-input">Text</label>
            <input
              id="text-input"
              value={text}
              maxLength={MAX_TEXT_LENGTH}
              placeholder="Type a word or short phrase"
              onChange={(e) => setText(sanitizeText(e.target.value))}
            />
            <small>Supports: A-Z / a-z / 0-9 / . , ! ? : ; - / / 空格</small>

            <label>Preset ({preset})</label>
            <div className="preset-row">
              {(['readable', 'poetic', 'wild'] as const).map((item) => (
                <button key={item} className={preset === item ? 'active' : ''} onClick={() => applyPreset(item)}>
                  {item}
                </button>
              ))}
            </div>

            {(
              [
                ['Abstractness', 'abstractness'],
                ['Line Wobble', 'lineWobble'],
                ['Symbol Density', 'symbolDensity'],
                ['Color Intensity', 'colorIntensity'],
              ] as const
            ).map(([label, key]) => (
              <div key={key} className="slider-group">
                <div>
                  <span>{label}</span>
                  <strong>{settings[key]}</strong>
                </div>
                <input type="range" min={0} max={100} value={settings[key]} onChange={(e) => updateSetting(key, Number(e.target.value))} />
              </div>
            ))}

            <div className="action-row">
              <button onClick={() => setSeed(Date.now())}>Regenerate</button>
              <button onClick={exportPng}>Export PNG</button>
              <button onClick={exportSvg}>Export SVG</button>
            </div>
          </aside>

          <section className="panel canvas-wrap">
            <svg ref={svgRef} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}>
              <rect width="100%" height="100%" fill={PALETTE.paper} />
              {composition.blobs.map((blob, i) => (
                <ellipse key={`blob-${i}`} cx={blob.cx} cy={blob.cy} rx={blob.rx} ry={blob.ry} fill={blob.color} opacity={blob.opacity} />
              ))}
              {composition.lines.map((line, i) => (
                <path key={`line-${i}`} d={line.path} stroke={line.color} strokeWidth={line.width} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              ))}
              {composition.symbols.map((sym, i) => (
                <g key={`symbol-${i}`} transform={`translate(${sym.x} ${sym.y})`}>
                  {sym.shape === 'dot' && <circle r={sym.size / 2} fill={sym.color} />}
                  {sym.shape === 'eye' && <ellipse rx={sym.size * 0.6} ry={sym.size * 0.36} fill="none" stroke={sym.color} strokeWidth={3} />}
                  {sym.shape === 'moon' && (
                    <path d={`M ${sym.size * 0.5} 0 A ${sym.size * 0.5} ${sym.size * 0.5} 0 1 1 ${-sym.size * 0.5} 0 A ${sym.size * 0.25} ${sym.size * 0.5} 0 1 0 ${sym.size * 0.5} 0`} fill={sym.color} />
                  )}
                  {sym.shape === 'star' && (
                    <path d={`M 0 ${-sym.size} L ${sym.size * 0.25} ${-sym.size * 0.25} L ${sym.size} 0 L ${sym.size * 0.25} ${sym.size * 0.25} L 0 ${sym.size} L ${-sym.size * 0.25} ${sym.size * 0.25} L ${-sym.size} 0 L ${-sym.size * 0.25} ${-sym.size * 0.25} Z`} fill="none" stroke={sym.color} strokeWidth={2.2} />
                  )}
                </g>
              ))}
            </svg>
          </section>
        </section>
      )}

      {page === 'glyphs' && (
        <section className="panel page">
          <h2>Glyph System</h2>
          <p>Base Skeleton → Miró Line → Symbolic Composition</p>
          <div className="glyph-grid">
            {GLYPHS.map((glyph) => (
              <div key={glyph} className="glyph-cell">
                {glyph}
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'gallery' && (
        <section className="panel page">
          <h2>Gallery</h2>
          <p>Click any sample to open it in Playground with a new generated composition.</p>
          <div className="gallery-grid">
            {GALLERY_CASES.map((item) => (
              <button key={item} onClick={() => goPlayground(item)}>
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {page === 'about' && (
        <section className="panel page">
          <h2>About</h2>
          <p>
            This project is not an official Joan Miró typeface. It is an experimental type playground inspired by symbolic abstraction, childlike marks,
            poetic space, and primary-color composition.
          </p>
          <p>这不是 Joan Miró 官方字体，也不是对其具体作品的复制。它是一套受其视觉语言启发的实验字体系统，尝试将手绘线条、原始符号、漂浮空间和高纯度色彩转译为可交互的字体生成规则。</p>
        </section>
      )}
    </main>
  )
}
