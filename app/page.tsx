'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!inputText.trim()) {
      setError('テキストを入力してください！');
      return;
    }

    setIsLoading(true);
    setError('');
    setVariations([]);

    try {
      const response = await fetch('/api/zundamon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'エラーが発生しました');
      }

      setVariations(data.variations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            ずんだもん風投稿変換アプリ
          </h1>
          <p className="text-green-600">
            普通の文章をずんだもん風に変換するのだ！
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label htmlFor="input-text" className="block text-lg font-medium text-gray-700 mb-2">
            変換したい文章を入力してください
          </label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 resize-none"
            rows={4}
            placeholder="ここに文章を入力するのだ..."
          />
          
          {error && (
            <div className="mt-2 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={isLoading}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {isLoading ? '変換中なのだ...' : 'ずんだもん風に変換！'}
          </button>
        </div>

        {variations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              変換結果なのだ！
            </h2>
            <div className="space-y-4">
              {variations.map((variation, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors"
                >
                  <div className="flex items-start">
                    <span className="inline-block bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 flex-1">{variation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}