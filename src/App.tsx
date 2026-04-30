import { useState } from 'react'

function App() {
  const [message] = useState('纸牌玩法代码已清空，准备接入新功能。')

  return (
    <main className="game">
      <header className="panel">
        <h1>Typing Master</h1>
        <p>{message}</p>
      </header>
    </main>
  )
}

export default App
