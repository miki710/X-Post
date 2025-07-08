# ずんだもん風変換ツール 🎯

Google Gemini APIを使用して、日本語テキストを「ずんだもん風」の口調に変換するWebアプリケーションです。

## 🌟 特徴

- 日本語テキストを「ずんだもん風」の柔らかい語尾に変換
- 「のだ」「なのだ」などの特徴的な語尾を使用
- Markdown形式のテキストにも対応
- クリップボードへのコピー機能
- レスポンシブデザイン

## 🛠️ 技術スタック

- **フロントエンド**: React + Vite
- **バックエンド**: Node.js + Express
- **AI**: Google Gemini 1.5 Flash API
- **スタイリング**: CSS3

## 📋 必要な環境

- Node.js (v16以上)
- npm または yarn
- Google Cloud Platform アカウント（Gemini API キー取得用）

## 🚀 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/miki710/X-Post.git
cd X-Post
```

### 2. 依存関係のインストール

```bash
# ルートディレクトリで実行（モノレポの全パッケージをインストール）
npm install
```

### 3. 環境変数の設定

```bash
# バックエンドディレクトリに移動
cd backend

# .env.exampleをコピーして.envを作成
cp .env.example .env
```

`.env`ファイルを編集して、Google API キーを設定：

```env
GOOGLE_API_KEY=your_actual_google_api_key_here
PORT=5000
```

### 4. Google API キーの取得

1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. Google アカウントでログイン
3. 「API キーを作成」をクリック
4. 生成されたAPIキーをコピーして`.env`ファイルに貼り付け

## 🏃‍♂️ アプリケーションの起動

### 開発モード

```bash
# ルートディレクトリから
npm run dev
```

これにより以下が同時に起動します：
- バックエンドサーバー: http://localhost:5000
- フロントエンド開発サーバー: http://localhost:5173

### 個別起動

```bash
# バックエンドのみ
npm run dev:backend

# フロントエンドのみ
npm run dev:frontend
```

## 📝 使い方

1. ブラウザで http://localhost:5173 を開く
2. テキストエリアに変換したい日本語テキストを入力
3. 「ずんだもん風に変換」ボタンをクリック
4. 変換結果が表示される
5. 「コピー」ボタンで結果をクリップボードにコピー可能

## 🔧 API エンドポイント

### POST /api/zundamonify

テキストをずんだもん風に変換します。

**リクエスト:**
```json
{
  "text": "今日はいい天気です"
}
```

**レスポンス:**
```json
{
  "original": "今日はいい天気です",
  "converted": "今日はいい天気なのだ"
}
```

### GET /api/health

ヘルスチェックエンドポイント

**レスポンス:**
```json
{
  "status": "OK",
  "message": "Zundamon Text Converter API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🏗️ プロジェクト構造

```
X-Post/
├── backend/                 # バックエンドアプリケーション
│   ├── server.js           # Express サーバー
│   ├── zundamonify.js      # テキスト変換ロジック
│   ├── package.json        # バックエンドの依存関係
│   └── .env.example        # 環境変数のテンプレート
├── frontend/               # フロントエンドアプリケーション
│   ├── src/
│   │   ├── App.jsx        # メインコンポーネント
│   │   ├── App.css        # アプリケーションスタイル
│   │   ├── main.jsx       # エントリーポイント
│   │   └── index.css      # グローバルスタイル
│   ├── index.html         # HTMLテンプレート
│   ├── vite.config.js     # Vite設定
│   └── package.json       # フロントエンドの依存関係
├── package.json           # ワークスペース設定
└── README.md             # このファイル
```

## 🤝 貢献

プルリクエストは歓迎します。大きな変更の場合は、まずイシューを開いて変更内容について議論してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- Google Gemini API チーム
- ずんだもんキャラクター