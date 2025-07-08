# テキスト変換ツール - ずんだもん風 & おばさん構文

Google Gemini APIを使用して、日本語テキストを「ずんだもん風」または「おばさん構文」に変換するWebアプリケーションです。

## 機能

- **ずんだもん風変換**: 文章を「のだ」「なのだ」などの特徴的な語尾に変換
- **おばさん構文変換**: 絵文字や顔文字を多用し、テンション高めの文体に変換
- スタイル選択機能
- リアルタイム変換
- クリップボードコピー機能
- レスポンシブデザイン

## 技術スタック

### バックエンド
- Node.js
- Express.js
- Google Gemini API (`@google/generative-ai`)
- dotenv (環境変数管理)

### フロントエンド
- React 18
- Vite
- CSS3 (レスポンシブデザイン)

## セットアップ

### 前提条件
- Node.js 18以上
- Google Cloud APIキー（Gemini API用）

### インストール手順

1. リポジトリをクローン
```bash
git clone https://github.com/miki710/X-Post.git
cd X-Post
```

2. 依存関係のインストール
```bash
# ルートディレクトリで
npm install
```

3. 環境変数の設定
```bash
cd backend
cp .env.example .env
```

`.env`ファイルを編集し、Google APIキーを設定：
```
GOOGLE_API_KEY=your-google-api-key-here
```

4. アプリケーションの起動
```bash
# ルートディレクトリから
npm run dev
```

これにより以下が起動します：
- バックエンド: http://localhost:3001
- フロントエンド: http://localhost:5173

## 使い方

1. ブラウザで http://localhost:5173 にアクセス
2. 変換スタイルを選択（ずんだもん風 or おばさん構文）
3. テキストエリアに日本語テキストを入力
4. 「変換」ボタンをクリック
5. 変換結果が表示されたら、必要に応じてコピーボタンでクリップボードにコピー

## API エンドポイント

### POST /api/convert
テキストを指定されたスタイルに変換します。

**リクエストボディ:**
```json
{
  "text": "変換したいテキスト",
  "style": "zundamon" | "obasan"
}
```

**レスポンス:**
```json
{
  "original": "元のテキスト",
  "converted": "変換後のテキスト",
  "style": "使用されたスタイル"
}
```

## プロジェクト構造

```
X-Post/
├── backend/
│   ├── server.js           # Express サーバー
│   ├── zundamonify.js      # ずんだもん変換関数
│   ├── obasanify.js        # おばさん構文変換関数
│   ├── .env.example        # 環境変数テンプレート
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # メインコンポーネント
│   │   ├── App.css         # スタイリング
│   │   ├── main.jsx        # エントリーポイント
│   │   └── index.css       # グローバルスタイル
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json            # ルートpackage.json
└── README.md
```

## スクリプト

### ルートディレクトリ
- `npm install`: 全ての依存関係をインストール
- `npm run dev`: 開発サーバーを起動（バックエンド＆フロントエンド）
- `npm run dev:backend`: バックエンドのみ起動
- `npm run dev:frontend`: フロントエンドのみ起動

### バックエンド
- `npm start`: 本番モードでサーバーを起動
- `npm run dev`: 開発モードでサーバーを起動（ファイル監視付き）

### フロントエンド
- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用ビルドを作成
- `npm run preview`: ビルドのプレビュー

## ライセンス

MIT

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容について議論してください。