import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [style, setStyle] = useState('zundamon')
  const [copied, setCopied] = useState(false)

  const handleConvert = async () => {
    if (!inputText.trim()) {
      setError('テキストを入力してください')
      return
    }

    setIsLoading(true)
    setError('')
    setConvertedText('')

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          style: style
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'エラーが発生しました')
      }

      setConvertedText(data.converted); // 修正: data.converted -> data.convertedText
    } catch (error) {
      setError(error.message || 'テキスト変換中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('コピーに失敗しました:', error)
    }
  }

  const getStyleName = () => {
    switch (style) {
      case 'zundamon':
        return 'ずんだもん風'
      case 'obasan':
        return 'おばさん構文'
      case 'influencer': // ★ 追加 ★
        return '女性アフィリエイター風'
      default:
        return ''
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>テキスト変換ツール</h1>
        <p className="subtitle">文章をずんだもん風やおばさん構文に変換します</p>
      </header>

      <main className="main">
        <div className="style-selector">
          <h2>変換スタイルを選択</h2>
          <div className="radio-group">
            {/* ずんだもん風 */}
            <label className={`radio-label ${style === 'zundamon' ? 'active' : ''}`}>
              <input
                type="radio"
                name="style"
                value="zundamon"
                checked={style === 'zundamon'}
                onChange={(e) => setStyle(e.target.value)}
              />
              <span className="radio-text">ずんだもん風</span>
              <span className="style-example">例: 〜のだ、〜なのだ</span>
            </label>
            {/* おばさん構文 */}
            <label className={`radio-label ${style === 'obasan' ? 'active' : ''}`}>
              <input
                type="radio"
                name="style"
                value="obasan"
                checked={style === 'obasan'}
                onChange={(e) => setStyle(e.target.value)}
              />
              <span className="radio-text">おばさん構文</span>
              <span className="style-example">例: 〜ね〜！😊✨💕</span>
            </label>
            {/* ★ 女性アフィリエイター風を追加 ★ */}
            <label className={`radio-label ${style === 'influencer' ? 'active' : ''}`}>
              <input
                type="radio"
                name="style"
                value="influencer"
                checked={style === 'influencer'}
                onChange={(e) => setStyle(e.target.value)}
              />
              <span className="radio-text">女性アフィリエイター風</span>
              <span className="style-example">例: 〜よ✨💖、〜すぎ🥺</span>
            </label>
          </div>
        </div>

        <div className="input-section">
          <label htmlFor="input-text">
            <h2>変換したいテキスト</h2>
          </label>
          <textarea
            id="input-text"
            className="textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ここに日本語のテキストを入力してください..."
            rows={6}
          />
          <button
            className="convert-button"
            onClick={handleConvert}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? '変換中...' : `${getStyleName()}に変換`}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {convertedText && (
          <div className="result-section">
            <div className="result-header">
              <h2>{getStyleName()}変換結果</h2>
              <button
                className="copy-button"
                onClick={handleCopy}
                title="クリップボードにコピー"
              >
                {copied ? '✓ コピーしました' : '📋 コピー'}
              </button>
            </div>
            <div className="result-text">
              {convertedText}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
