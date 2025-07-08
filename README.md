# ずんだもん風投稿変換アプリ

入力された文章をずんだもん風の口調に変換するWebアプリケーションです。

## 機能

- テキスト入力フォーム
- ずんだもん風への変換（5つのバリエーション生成）
- リアルタイムエラーハンドリング
- レスポンシブデザイン

## 技術スタック

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Anthropic Claude API

## セットアップ

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を追加：

```
ANTHROPIC_API_KEY=your_api_key_here
```

3. 開発サーバーの起動

```bash
npm run dev
```

4. ブラウザで `http://localhost:3000` にアクセス

## 使い方

1. テキストボックスに変換したい文章を入力
2. 「ずんだもん風に変換！」ボタンをクリック
3. 5つのずんだもん風バリエーションが表示されます

## APIエンドポイント

- `POST /api/zundamon` - 文章をずんだもん風に変換

リクエストボディ:
```json
{
  "text": "変換したい文章"
}
```

レスポンス:
```json
{
  "variations": [
    "変換結果1",
    "変換結果2",
    "変換結果3",
    "変換結果4",
    "変換結果5"
  ]
}
```

## プロジェクト構造

```
/
├── app/
│   ├── api/
│   │   └── zundamon/
│   │       └── route.ts      # APIエンドポイント
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # メインページ
├── prompt-design.md          # ずんだもん風ガイドライン
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```