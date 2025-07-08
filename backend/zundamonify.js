const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const ZUNDAMON_PROMPT = `以下の日本語テキストを「ずんだもん風の口調」に変換してください。

変換ルール：
- 東北なまりや方言にはしないでください
- 語尾は「のだ」「なのだ」を基本としてください
- 「欲しいぞ」「見なくなったな」「パクリじゃないの？」のようなずんだもんらしい語感のものも適切に使用してください
- ユーモラスで親しみやすい雰囲気にしてください
- 元の文章の意味は変えないでください
- Markdown形式がある場合は保持してください

入力テキスト:
`;

async function zundamonify(text) {
  try {
    // Use Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = ZUNDAMON_PROMPT + text;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const convertedText = response.text();

    return {
      success: true,
      original: text,
      converted: convertedText.trim()
    };
  } catch (error) {
    console.error('Error in zundamonify:', error);
    return {
      success: false,
      error: error.message || 'Failed to convert text',
      original: text
    };
  }
}

module.exports = { zundamonify };