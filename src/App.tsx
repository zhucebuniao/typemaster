import { useMemo, useState } from 'react'

type Suit = '墨竹' | '山石' | '云纹' | '月影'

type PlayingCard = {
  id: string
  suit: Suit
  rank: number
}

type SpiritCard = {
  id: string
  name: string
  description: string
  bonus: (ctx: { handType: HandType; suits: Suit[]; ranks: number[] }) => number
}

type HandType = '高牌' | '对子' | '两对' | '三条' | '顺子' | '同花' | '葫芦' | '四条' | '同花顺'

const SUITS: Suit[] = ['墨竹', '山石', '云纹', '月影']
const TARGETS = [120, 240, 420]

const spiritCards: SpiritCard[] = [
  {
    id: 'ink-mirror',
    name: '玄镜',
    description: '若为同花，额外 +40 分。',
    bonus: ({ handType }) => (handType === '同花' || handType === '同花顺' ? 40 : 0),
  },
  {
    id: 'bamboo-seal',
    name: '竹印',
    description: '每出现一张「墨竹」+8 分。',
    bonus: ({ suits }) => suits.filter((s) => s === '墨竹').length * 8,
  },
  {
    id: 'moon-brush',
    name: '月毫',
    description: '若最大点数 ≥ 12（Q/K/A），+25 分。',
    bonus: ({ ranks }) => (Math.max(...ranks) >= 12 ? 25 : 0),
  },
]

const handBaseScore: Record<HandType, number> = {
  高牌: 10,
  对子: 25,
  两对: 45,
  三条: 70,
  顺子: 95,
  同花: 110,
  葫芦: 140,
  四条: 180,
  同花顺: 240,
}

function createDeck() {
  const deck: PlayingCard[] = []
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank += 1) {
      deck.push({ id: `${suit}-${rank}`, suit, rank })
    }
  }
  return shuffle(deck)
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function rankLabel(rank: number) {
  if (rank === 1) return 'A'
  if (rank === 11) return 'J'
  if (rank === 12) return 'Q'
  if (rank === 13) return 'K'
  return String(rank)
}

function evaluateHand(cards: PlayingCard[]): HandType {
  const ranks = cards.map((c) => (c.rank === 1 ? 14 : c.rank)).sort((a, b) => a - b)
  const suits = cards.map((c) => c.suit)
  const counts = new Map<number, number>()
  ranks.forEach((r) => counts.set(r, (counts.get(r) ?? 0) + 1))

  const values = Array.from(counts.values()).sort((a, b) => b - a)
  const flush = suits.every((s) => s === suits[0])
  const uniqueRanks = [...new Set(ranks)]
  const straight = uniqueRanks.length === 5 && (uniqueRanks[4] - uniqueRanks[0] === 4 || JSON.stringify(uniqueRanks) === JSON.stringify([2, 3, 4, 5, 14]))

  if (straight && flush) return '同花顺'
  if (values[0] === 4) return '四条'
  if (values[0] === 3 && values[1] === 2) return '葫芦'
  if (flush) return '同花'
  if (straight) return '顺子'
  if (values[0] === 3) return '三条'
  if (values[0] === 2 && values[1] === 2) return '两对'
  if (values[0] === 2) return '对子'
  return '高牌'
}

function App() {
  const [deck, setDeck] = useState<PlayingCard[]>(() => createDeck())
  const [hand, setHand] = useState<PlayingCard[]>(() => createDeck().slice(0, 8))
  const [selected, setSelected] = useState<PlayingCard[]>([])
  const [spirit] = useState<SpiritCard>(() => spiritCards[Math.floor(Math.random() * spiritCards.length)])
  const [blindIndex, setBlindIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [playsLeft, setPlaysLeft] = useState(4)
  const [message, setMessage] = useState('选择 5 张牌出手，冲击本关目标分。')

  const target = TARGETS[blindIndex]
  const isWin = score >= target
  const isLose = playsLeft === 0 && !isWin

  const toggleCard = (card: PlayingCard) => {
    setSelected((cur) => {
      const exists = cur.some((c) => c.id === card.id)
      if (exists) return cur.filter((c) => c.id !== card.id)
      if (cur.length >= 5) return cur
      return [...cur, card]
    })
  }

  const playSelected = () => {
    if (selected.length !== 5 || isWin || isLose) return
    const handType = evaluateHand(selected)
    const ranks = selected.map((c) => (c.rank === 1 ? 14 : c.rank))
    const suits = selected.map((c) => c.suit)
    const base = handBaseScore[handType]
    const points = base + ranks.reduce((a, b) => a + b, 0) + spirit.bonus({ handType, suits, ranks })

    setScore((s) => s + points)
    setPlaysLeft((n) => n - 1)
    setMessage(`${handType}：+${points} 分`)

    const selectedIds = new Set(selected.map((c) => c.id))
    const remainedHand = hand.filter((c) => !selectedIds.has(c.id))
    const need = 8 - remainedHand.length
    const draw = deck.slice(0, need)
    const nextDeck = deck.slice(need)
    setDeck(nextDeck)
    setHand([...remainedHand, ...draw])
    setSelected([])
  }

  const nextBlind = () => {
    if (!isWin || blindIndex >= TARGETS.length - 1) return
    setBlindIndex((n) => n + 1)
    setScore(0)
    setPlaysLeft(4)
    const newDeck = createDeck()
    setDeck(newDeck.slice(8))
    setHand(newDeck.slice(0, 8))
    setSelected([])
    setMessage('进入下一关。')
  }

  const restart = () => {
    const newDeck = createDeck()
    setBlindIndex(0)
    setScore(0)
    setPlaysLeft(4)
    setDeck(newDeck.slice(8))
    setHand(newDeck.slice(0, 8))
    setSelected([])
    setMessage('新牌局开始。')
  }

  const progressText = useMemo(() => `第 ${blindIndex + 1} 关 / ${TARGETS.length} 关`, [blindIndex])

  return (
    <main className="game">
      <header className="panel">
        <h1>墨局 · 行旅</h1>
        <p>{progressText}｜目标 {target} 分</p>
        <div className="stats">
          <span>当前分数：{score}</span>
          <span>剩余出牌：{playsLeft}</span>
        </div>
      </header>

      <section className="panel spirit">
        <h2>灵物牌：{spirit.name}</h2>
        <p>{spirit.description}</p>
      </section>

      <section className="panel">
        <h2>手牌（已选 {selected.length}/5）</h2>
        <div className="hand-grid">
          {hand.map((card) => {
            const active = selected.some((c) => c.id === card.id)
            return (
              <button key={card.id} className={`card ${active ? 'active' : ''}`} onClick={() => toggleCard(card)}>
                <small>{card.suit}</small>
                <strong>{rankLabel(card.rank)}</strong>
              </button>
            )
          })}
        </div>
      </section>

      <section className="panel actions">
        <p>{message}</p>
        <div className="btn-row">
          <button onClick={playSelected} disabled={selected.length !== 5 || isWin || isLose}>出牌结算</button>
          <button onClick={nextBlind} disabled={!isWin || blindIndex >= TARGETS.length - 1}>下一关</button>
          <button onClick={restart}>重开</button>
        </div>
        {isWin && blindIndex === TARGETS.length - 1 && <p className="result">你已通关本次水墨试炼。</p>}
        {isLose && <p className="result fail">墨尽局散，建议重开。</p>}
      </section>
    </main>
  )
}

export default App
