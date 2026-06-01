import { useState } from 'react'

const categories = [
  {
    name: '教程',
    items: [
      { id: 'pi', label: 'π Agent', href: '/tutorials/pi-agent-tutorial.html', icon: 'π', color: '#d97757', desc: '终端编码代理入门' },
      { id: 'gsap', label: 'GSAP', href: '/tutorials/gsap-tutorial.html', icon: '⚡', color: '#68d391', desc: '前端动画库核心概念' },
      { id: 'threejs', label: 'Three.js', href: '/tutorials/threejs-tutorial.html', icon: '🎲', color: '#7c8aff', desc: 'WebGL 3D 场景构建' },
      { id: 'hanzi', label: '汉字笔顺', href: '/tutorials/jingyesi.html', icon: '🖌', color: '#fb923c', desc: '交互式汉字笔画逐笔动画' },
      { id: 'ascii', label: 'ASCII Art', href: '/tutorials/ascii-art.html', icon: '🎨', color: '#fb923c', desc: '图片转字符画，实时预览' },
      { id: 'gsap-ascii', label: 'GSAP + ASCII', href: '/tutorials/gsap-ascii.html', icon: '✨', color: '#68d391', desc: 'GSAP 驱动字符矩阵动画' },
      { id: 'ascii-music', label: 'ASCII 音乐可视化', href: '/tutorials/ascii-music.html', icon: '🎵', color: '#6a9cf5', desc: '音频 FFT → ASCII 实时渲染' },
      { id: 'ascii-video', label: 'ASCII 视频', href: '/tutorials/ascii-video.html', icon: '🎬', color: '#68d391', desc: '视频转复古终端风格' },
      { id: 'threejs-ascii', label: 'Three.js ASCII', href: '/tutorials/threejs-ascii.html', icon: '🎲', color: '#7c8aff', desc: '3D 场景实时降维成字符画' },
    ]
  },
  {
    name: '更多',
    items: [
      { id: 'coming', label: '即将推出...', href: '#', icon: '⋯', color: '#5c6070', desc: '更多内容准备中' },
    ]
  }
]

const featured = [
  { id: 'pi', title: 'π Agent', desc: '7 个原语工具，无限可能。从 LLM 到 Agent 的跃迁。', icon: 'π', color: '#d97757', bg: 'rgba(217,119,87,0.08)', href: '/tutorials/pi-agent-tutorial.html' },
  { id: 'gsap', title: 'GSAP 动画', desc: 'Tween、缓动、时间线编排、Stagger、ScrollTrigger。', icon: '⚡', color: '#68d391', bg: 'rgba(104,211,145,0.08)', href: '/tutorials/gsap-tutorial.html' },
  { id: 'threejs', title: 'Three.js 3D', desc: '场景三件套、几何体、材质光照、动画循环。', icon: '🎲', color: '#7c8aff', bg: 'rgba(124,138,255,0.08)', href: '/tutorials/threejs-tutorial.html' },
  { id: 'hanzi', title: '汉字笔顺', desc: 'HanziWriter 交互式逐笔动画。', icon: '🖌', color: '#fb923c', bg: 'rgba(251,146,60,0.08)', href: '/tutorials/jingyesi.html' },
  { id: 'ascii', title: 'ASCII Art', desc: '图片转字符画，8 种字符集，实时预览。', icon: '🎨', color: '#fb923c', bg: 'rgba(251,146,60,0.08)', href: '/tutorials/ascii-art.html' },
  { id: 'gsap-ascii', title: 'GSAP + ASCII', desc: 'GSAP 缓动函数驱动字符矩阵动画。', icon: '✨', color: '#68d391', bg: 'rgba(104,211,145,0.08)', href: '/tutorials/gsap-ascii.html' },
  { id: 'ascii-music', title: 'ASCII 音乐可视化', desc: 'Web Audio API FFT 频谱 → ASCII 实时渲染。', icon: '🎵', color: '#6a9cf5', bg: 'rgba(106,156,245,0.08)', href: '/tutorials/ascii-music.html' },
  { id: 'ascii-video', title: 'ASCII 视频', desc: '视频转复古终端风格字符画动画。', icon: '🎬', color: '#68d391', bg: 'rgba(104,211,145,0.08)', href: '/tutorials/ascii-video.html' },
  { id: 'threejs-ascii', title: 'Three.js ASCII', desc: '3D 场景实时降维成字符画。', icon: '🎲', color: '#7c8aff', bg: 'rgba(124,138,255,0.08)', href: '/tutorials/threejs-ascii.html' },
]

export default function App() {
  const [activeId, setActiveId] = useState('pi')

  return (
    <div className="docs-layout">
      {/* Top bar */}
      <header className="docs-topbar">
        <a href="/" className="docs-logo">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lab</span>
        </a>
        <div className="topbar-right">
          <a href="https://github.com/zhucebuniao" className="topbar-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </header>

      <div className="docs-body">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <nav className="sidebar-nav">
            {categories.map(cat => (
              <div className="sidebar-group" key={cat.name}>
                <div className="sidebar-group-title">{cat.name}</div>
                {cat.items.map(item => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`sidebar-link ${activeId === item.id ? 'active' : ''}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="sidebar-link-icon" style={{ color: item.color }}>{item.icon}</span>
                    <span className="sidebar-link-label">{item.label}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="sidebar-version">v0.1</span>
          </div>
        </aside>

        {/* Main content */}
        <main className="docs-main">
          <div className="docs-content">
            <div className="page-header">
              <div className="page-breadcrumb">Lab</div>
              <h1 className="page-title">交互教程</h1>
              <p className="page-desc">面向开发者的渐进式交互教程，每个都是可运行的独立页面。</p>
            </div>

            <section className="section-block">
              <h2 className="section-title">精选</h2>
              <div className="featured-grid">
                {featured.map(f => (
                  <a key={f.id} href={f.href} className="featured-card" style={{ background: f.bg, borderColor: f.color + '30' }}>
                    <div className="featured-icon" style={{ color: f.color, background: f.color + '15' }}>{f.icon}</div>
                    <h3 className="featured-title">{f.title}</h3>
                    <p className="featured-desc">{f.desc}</p>
                    <div className="featured-arrow" style={{ color: f.color }}>→</div>
                  </a>
                ))}
              </div>
            </section>

            <section className="section-block">
              <h2 className="section-title">全部教程</h2>
              <div className="tutorials-list">
                {categories[0].items.map(item => (
                  <a key={item.id} href={item.href} className="tutorial-row" onClick={() => setActiveId(item.id)}>
                    <div className="tutorial-row-icon" style={{ color: item.color, background: item.color + '12' }}>{item.icon}</div>
                    <div className="tutorial-row-info">
                      <div className="tutorial-row-title">{item.label}</div>
                      <div className="tutorial-row-desc">{item.desc}</div>
                    </div>
                    <div className="tutorial-row-meta">
                      <span className="tutorial-row-tag" style={{ borderColor: item.color + '40', color: item.color }}>交互</span>
                    </div>
                  </a>
                ))}
                {categories[1].items.map(item => (
                  <div key={item.id} className="tutorial-row coming">
                    <div className="tutorial-row-icon" style={{ color: item.color, background: item.color + '12' }}>{item.icon}</div>
                    <div className="tutorial-row-info">
                      <div className="tutorial-row-title">{item.label}</div>
                      <div className="tutorial-row-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
