import { useMemo, useState } from 'react'
import { initialPrompts } from './mockData'
import type { PromptItem, TabKey } from './types'

function formatRelativeTime(value?: string): string {
  if (!value) return '刚刚'
  const diff = Date.now() - new Date(value).getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`
  return `${Math.floor(diff / hour)} 小时前`
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('gallery')
  const [query, setQuery] = useState('')
  const [prompts, setPrompts] = useState<PromptItem[]>(initialPrompts)
  const [selectedId, setSelectedId] = useState<string>(initialPrompts[0].id)

  const selected = prompts.find((item) => item.id === selectedId) ?? prompts[0]

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    if (!normalized) return prompts
    return prompts.filter((item) => {
      const target = `${item.title} ${item.prompt} ${item.tags.join(' ')}`.toLowerCase()
      return target.includes(normalized)
    })
  }, [prompts, query])

  const recent = useMemo(
    () => [...prompts].filter((item) => item.lastCopiedAt).sort((a, b) => (b.lastCopiedAt ?? '').localeCompare(a.lastCopiedAt ?? '')),
    [prompts],
  )

  const handleCopy = async (id: string) => {
    const item = prompts.find((prompt) => prompt.id === id)
    if (!item) return

    try {
      await navigator.clipboard.writeText(item.prompt)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = item.prompt
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    setPrompts((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              copyCount: entry.copyCount + 1,
              lastCopiedAt: new Date().toISOString(),
            }
          : entry,
      ),
    )
  }

  return (
    <main className="app-shell">
      <header>
        <h1>Prompt Gallery</h1>
        <p>本地优先的 Prompt 与图片收藏库（MVP）</p>
      </header>

      <section className="toolbar">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索 prompt / 标签"
        />
      </section>

      {tab === 'gallery' && (
        <section className="layout">
          <div className="list-panel">
            {filtered.map((item) => (
              <button key={item.id} className="card" onClick={() => setSelectedId(item.id)}>
                <img src={item.imageUrl} alt={item.title} />
                <strong>{item.title}</strong>
                <span>{item.prompt.slice(0, 42)}...</span>
              </button>
            ))}
          </div>

          {selected && (
            <article className="detail-panel">
              <img src={selected.imageUrl} alt={selected.title} />
              <h2>{selected.title}</h2>
              <div className="tags">
                {selected.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
              <p>{selected.prompt}</p>
              {selected.note && <small>备注：{selected.note}</small>}
              <button className="copy-btn" onClick={() => handleCopy(selected.id)}>
                复制 Prompt（已复制 {selected.copyCount} 次）
              </button>
            </article>
          )}
        </section>
      )}

      {tab === 'recent' && (
        <section className="recent-panel">
          {recent.length === 0 && <p>暂无复制记录</p>}
          {recent.map((item) => (
            <div className="recent-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.prompt.slice(0, 80)}...</p>
              </div>
              <div>
                <span>{formatRelativeTime(item.lastCopiedAt)}</span>
                <button onClick={() => handleCopy(item.id)}>再次复制</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === 'favorites' && <section className="placeholder">收藏功能将在下一阶段实现。</section>}
      {tab === 'settings' && <section className="placeholder">设置功能将在下一阶段实现。</section>}

      <nav className="tabbar">
        <button onClick={() => setTab('gallery')} data-active={tab === 'gallery'}>图库</button>
        <button onClick={() => setTab('favorites')} data-active={tab === 'favorites'}>收藏</button>
        <button onClick={() => setTab('recent')} data-active={tab === 'recent'}>最近复制</button>
        <button onClick={() => setTab('settings')} data-active={tab === 'settings'}>设置</button>
      </nav>
    </main>
  )
}
