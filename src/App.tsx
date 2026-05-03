import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { hotTags, initialPrompts } from './mockData'
import type { PromptItem, TabKey } from './types'

const STORAGE_KEY = 'prompt-gallery-v1'
const SEARCH_HISTORY_KEY = 'prompt-search-history-v1'

function formatRelativeTime(value?: string): string {
  if (!value) return '刚刚'
  const diff = Date.now() - new Date(value).getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`
  return `${Math.floor(diff / hour)} 小时前`
}

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('gallery')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [prompts, setPrompts] = useState<PromptItem[]>(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), initialPrompts))
  const [searchHistory, setSearchHistory] = useState<string[]>(() =>
    safeJsonParse(localStorage.getItem(SEARCH_HISTORY_KEY), [] as string[]),
  )
  const [selectedId, setSelectedId] = useState<string>(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), initialPrompts)[0]?.id)
  const [draft, setDraft] = useState({ imageUrl: '', title: '', prompt: '', tags: '', note: '' })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
  }, [prompts])

  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory))
  }, [searchHistory])

  const selected = prompts.find((item) => item.id === selectedId) ?? prompts[0]

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    if (!normalized) return prompts
    return prompts.filter((item) => {
      const target = `${item.title} ${item.prompt} ${item.tags.join(' ')}`.toLowerCase()
      return target.includes(normalized)
    })
  }, [prompts, query])

  const favoriteList = useMemo(() => prompts.filter((item) => item.isFavorite), [prompts])
  const recent = useMemo(
    () => [...prompts].filter((item) => item.lastCopiedAt).sort((a, b) => (b.lastCopiedAt ?? '').localeCompare(a.lastCopiedAt ?? '')),
    [prompts],
  )

  const registerSearch = (text: string) => {
    const value = text.trim()
    if (!value) return
    setSearchHistory((prev) => [value, ...prev.filter((item) => item !== value)].slice(0, 8))
  }

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
              updatedAt: new Date().toISOString(),
            }
          : entry,
      ),
    )
  }

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              isFavorite: !entry.isFavorite,
              updatedAt: new Date().toISOString(),
            }
          : entry,
      ),
    )
  }

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.title.trim() || !draft.prompt.trim() || !draft.imageUrl.trim()) return

    const item: PromptItem = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      prompt: draft.prompt.trim(),
      imageUrl: draft.imageUrl.trim(),
      tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      note: draft.note.trim() || undefined,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      copyCount: 0,
    }

    setPrompts((prev) => [item, ...prev])
    setSelectedId(item.id)
    setDraft({ imageUrl: '', title: '', prompt: '', tags: '', note: '' })
    setTab('gallery')
  }

  return (
    <main className="app-shell">
      <header className="header-row">
        <div>
          <h1>Prompt Gallery</h1>
          <p>本地优先的 Prompt 与图片收藏库</p>
        </div>
        <button onClick={() => setSearchOpen(true)}>搜索浮层</button>
      </header>

      <section className="toolbar">
        <input
          value={query}
          onFocus={() => setSearchOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索 prompt / 标签"
        />
      </section>

      {tab === 'gallery' && (
        <section className="layout">
          <div className="list-panel">
            {filtered.map((item) => (
              <article key={item.id} className="card-wrap">
                <button className="card" onClick={() => setSelectedId(item.id)}>
                  <img src={item.imageUrl} alt={item.title} />
                  <strong>{item.title}</strong>
                  <span>{item.prompt.slice(0, 42)}...</span>
                </button>
                <button className="mini" onClick={() => handleCopy(item.id)}>复制</button>
                <button className="mini" onClick={() => toggleFavorite(item.id)}>{item.isFavorite ? '取消收藏' : '收藏'}</button>
              </article>
            ))}
          </div>

          {selected && (
            <article className="detail-panel">
              <img src={selected.imageUrl} alt={selected.title} />
              <h2>{selected.title}</h2>
              <div className="tags">{selected.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
              <p>{selected.prompt}</p>
              {selected.note && <small>备注：{selected.note}</small>}
              <button className="copy-btn" onClick={() => handleCopy(selected.id)}>复制 Prompt（已复制 {selected.copyCount} 次）</button>
            </article>
          )}
        </section>
      )}

      {tab === 'favorites' && <section className="simple-list">{favoriteList.map((item) => <p key={item.id}>{item.title}</p>)}{favoriteList.length===0&&<p>暂无收藏</p>}</section>}

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

      {tab === 'settings' && (
        <form className="create-form" onSubmit={handleCreate}>
          <h3>新增流程（轻量）</h3>
          <input placeholder="图片 URL" value={draft.imageUrl} onChange={(e) => setDraft((p) => ({ ...p, imageUrl: e.target.value }))} />
          <input placeholder="标题" value={draft.title} onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))} />
          <textarea placeholder="Prompt" value={draft.prompt} onChange={(e) => setDraft((p) => ({ ...p, prompt: e.target.value }))} />
          <input placeholder="标签（逗号分隔）" value={draft.tags} onChange={(e) => setDraft((p) => ({ ...p, tags: e.target.value }))} />
          <textarea placeholder="备注（可选）" value={draft.note} onChange={(e) => setDraft((p) => ({ ...p, note: e.target.value }))} />
          <button type="submit">保存到图库</button>
        </form>
      )}

      {searchOpen && (
        <aside className="overlay">
          <div className="overlay-card">
            <div className="overlay-head">
              <strong>搜索浮层</strong>
              <button onClick={() => setSearchOpen(false)}>关闭</button>
            </div>
            <div className="chips">{hotTags.map((tag) => <button key={tag} onClick={() => {setQuery(tag);registerSearch(tag)}}>{tag}</button>)}</div>
            <div className="history">
              <strong>搜索历史</strong>
              {searchHistory.map((item) => <button key={item} onClick={() => {setQuery(item);registerSearch(item)}}>{item}</button>)}
              {searchHistory.length > 0 && <button onClick={() => setSearchHistory([])}>清空</button>}
            </div>
          </div>
        </aside>
      )}

      <nav className="tabbar">
        <button onClick={() => setTab('gallery')} data-active={tab === 'gallery'}>图库</button>
        <button onClick={() => setTab('favorites')} data-active={tab === 'favorites'}>收藏</button>
        <button onClick={() => setTab('recent')} data-active={tab === 'recent'}>最近复制</button>
        <button onClick={() => setTab('settings')} data-active={tab === 'settings'}>新增</button>
      </nav>
    </main>
  )
}
