// ✅ 必ず一番上に追加
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// そのあとに他の import や Express アプリの初期化
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
console.log("🔑 GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY); // ← この行を追加
const { zundamonify } = require('./zundamonify');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Zundamon Text Converter API is running',
    timestamp: new Date().toISOString()
  });
});

// Zundamonify endpoint
app.post('/api/zundamonify', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required' 
      });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ 
        error: 'Google API key is not configured' 
      });
    }

    // Convert text to Zundamon style
    const result = await zundamonify(text);

    if (result.success) {
      res.json({
        original: result.original,
        zundamonText: result.zundamonText  // ← ここを変えないこと
      });
    } else {
      res.status(500).json({ 
        error: result.error || 'Failed to convert text' 
      });
    }

  } catch (error) {
    console.error('Error in zundamonify endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});