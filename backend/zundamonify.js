import { GoogleGenerativeAI } from '@google/generative-ai';

export async function zundamonify(text, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `以下の日本語テキストを「ずんだもん風の口調」に変換してください。
  
変換ルール:
- 東北なまりや方言にはしないでください
- 語尾は「のだ」「なのだ」などを基本とし、「欲しいぞ」「見なくなったな」「パクリじゃないの？」のようなずんだもんらしい語感のものも許容します
- ユーモラスで親しみやすい雰囲気にしてください
- 元の文章の意味は変えないでください

入力テキスト:
${text}

変換後のテキストのみを出力してください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error in zundamonify:', error);
    throw new Error('ずんだもん風変換に失敗しました');
  }
}