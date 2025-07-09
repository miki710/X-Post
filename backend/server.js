// ✅ 必ず一番上に追加
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log(process.env.GOOGLE_API_KEY)

import express from 'express';
import cors from 'cors';
import { zundamonify } from './zundamonify.js';
import { obasanify } from './obasanify.js';
import { influencerify } from './influencerify.js'; // influencerifyをインポート

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Text conversion endpoint
app.post('/api/convert', async (req, res) => {
  try {
    const { text, style = 'zundamon' } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'テキストが入力されていません'
      });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({
        error: 'Google API キーが設定されていません'
      });
    }

    let convertedText;
    
    switch (style) {
      case 'zundamon':
        convertedText = await zundamonify(text, process.env.GOOGLE_API_KEY);
        break;
      case 'obasan':
        convertedText = await obasanify(text, process.env.GOOGLE_API_KEY);
        break;
      case 'influencer': // influencerスタイルを追加
        convertedText = await influencerify(text, process.env.GOOGLE_API_KEY); // APIキーを渡す
        break;
      default:
        return res.status(400).json({
          error: '無効なスタイルが指定されました。"zundamon" または "obasan" を指定してください。'
        });
    }

    res.json({
      original: text,
      converted: convertedText,
      style: style
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      error: error.message || 'テキスト変換中にエラーが発生しました'
    });
  }
});

// Legacy endpoint for backward compatibility
app.post('/api/zundamonify', async (req, res) => {
  req.body.style = 'zundamon';
  return app._router.handle(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/convert`);
});