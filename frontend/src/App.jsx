import React, { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConvert = async () => {
    if (!inputText.trim()) {
      setError('テキストを入力してください')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/zundamonify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error('変換に失敗しました')
      }

      const data = await response.json()
      console.log("🔍 APIレスポンス:", data);
      setOutputText(data.zundamonText)
    } catch (err) {
      setError(err.message || '変換中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => {
        // コピー成功のフィードバック
        const button = document.querySelector('.copy-button')
        button.textContent = 'コピーしました！'
        setTimeout(() => {
          button.textContent = 'コピー'
        }, 2000)
      })
      .catch(() => {
        setError('コピーに失敗しました')
      })
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>ずんだもん風変換ツール</h1>
          <p className="subtitle">テキストをずんだもん風に変換するのだ！</p>
        </header>

        <main className="main">
          <div className="input-section">
            <label htmlFor="input-text" className="label">
              変換したいテキストを入力するのだ
            </label>
            <textarea
              id="input-text"
              className="textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ここにテキストを入力してください..."
              rows="8"
            />
          </div>

          <div className="button-group">
            <button
              className="button button-primary"
              onClick={handleConvert}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? '変換中なのだ...' : 'ずんだもん風に変換'}
            </button>
            <button
              className="button button-secondary"
              onClick={handleClear}
              disabled={isLoading}
            >
              クリア
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {outputText && (
            <div className="output-section">
              <div className="output-header">
                <label className="label">変換結果なのだ</label>
                <button
                  className="copy-button"
                  onClick={handleCopy}
                >
                  コピー
                </button>
              </div>
              <div className="output-text">
                {outputText}
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>ずんだもん風変換ツール - テキストを楽しく変換するのだ！</p>
        </footer>
      </div>
    </div>
  )
}

export default App