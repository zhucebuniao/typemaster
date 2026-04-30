import { useMemo, useState } from 'react'

type Suit = '墨竹' | '山石' | '云纹' | '月影'

type Card = {
  id: number
  name: string
  suit: Suit
  value: number
  rarity: '普通' | '稀有' | '传说'
  effect: string
}

const DECK: Card[] = [
  { id: 1, name: '起笔', suit: '墨竹', value: 2, rarity: '普通', effect: '本回合基础分 +2' },
  { id: 2, name: '飞白', suit: '云纹', value: 4, rarity: '普通', effect: '若连出同花，额外 +2' },
  { id: 3, name: '留白', suit: '月影', value: 3, rarity: '普通', effect: '弃牌后返还 1 点墨气' },
  { id: 4, name: '破墨', suit: '山石', value: 6, rarity: '稀有', effect: '若本回合最后一张，倍率 x1.5' },
  { id: 5, name: '皴法', suit: '山石', value: 5, rarity: '稀有', effect: '每有 1 张山石牌，+1' },
  { id: 6, name: '泼彩', suit: '云纹', value: 8, rarity: '传说', effect: '出牌后重抽 1 张并倍率 x2' },
]

function App() {
  const [hand, setHand] = useState<Card[]>(DECK.slice(0, 4))
  const [played, setPlayed] = useState<Card[]>([])
  const [ink, setInk] = useState(3)

  const score = useMemo(() => played.reduce((sum, card) => sum + card.value, 0), [played])

  const playCard = (card: Card) => {
    if (ink <= 0) return
    setHand((current) => current.filter((c) => c.id !== card.id))
    setPlayed((current) => [...current, card])
    setInk((current) => current - 1)
  }

  const resetRound = () => {
    setHand(DECK.slice(0, 4))
    setPlayed([])
    setInk(3)
  }

  return (
    <main className="ink-table">
      <section className="panel header-panel">
        <h1>墨韵牌局</h1>
        <p>水墨风纸牌原型（玩法灵感：Roguelike 组牌）</p>
      </section>

      <section className="panel board-panel">
        <div className="stats">
          <div><span>分数</span><strong>{score}</strong></div>
          <div><span>墨气</span><strong>{ink}</strong></div>
          <div><span>已出牌</span><strong>{played.length}</strong></div>
        </div>

        <button className="ink-btn" onClick={resetRound}>重置回合</button>
      </section>

      <section className="panel">
        <h2>手牌</h2>
        <div className="card-grid">
          {hand.map((card) => (
            <button key={card.id} className="ink-card" onClick={() => playCard(card)}>
              <small>{card.rarity}</small>
              <h3>{card.name}</h3>
              <p>{card.suit}</p>
              <strong>{card.value}</strong>
              <em>{card.effect}</em>
            </button>
          ))}
          {hand.length === 0 && <p className="empty">手牌已空，请重置回合。</p>}
        </div>
      </section>

      <section className="panel">
        <h2>已打出</h2>
        <div className="played-list">
          {played.length === 0 ? <p className="empty">尚未出牌</p> : played.map((c) => <span key={c.id}>{c.name}</span>)}
        </div>
      </section>
    </main>
  )
}

export default App
