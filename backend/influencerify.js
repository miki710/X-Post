// backend/influencerify.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function influencerify(text, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `以下の日本語テキストを、女性アフィリエイター風の親しみやすく、かつ商品の魅力を最大限に引き出すような口調に変換してください。絵文字や顔文字、タメ口などを適切に使用し、読者の購買意欲をかき立てるような表現を取り入れてください。ただし、元の文章の意味や事実は変えないでください。

例文を参考にしてください：
- 🟪 千賀大先生も絶賛する美顔器は超ズボラな私でも1年半以上続いてるからほんとにおすすめよ。正直今まで使ってきた美顔器、スチーマー系全部手放して今これしか持ってない。電気マイクロニードルが肌表面に小さい穴開けて毛穴改善モードとかあるしほんまにすごいよ
- 🟪 新社会人は自分がご機嫌になれる方法を1つ持っとくといいよ…
私は自分のご機嫌取りにエシレ使ってる。美味すぎるよエシレ…私はこれより少し高いけどサブレグラッセってやつ…これよりうまいサブレに未だ出逢えてないんや…
- 🟪 乾燥肌すぎて顔に塗る日焼け止めはめちゃくちゃ慎重になるタイプなんだけど、ナチュラルベールはサラサラなのに全然乾燥感じなくて顔面砂漠化しなかった…！！ほんのりトーンアップしてくすみ吹き飛ぶし、ノンケミで肌にもやさしくて毎日使える🙏🏻 #PR #ロート製薬

入力テキスト:
${text}

変換後のテキストのみを出力してください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error in influencerify:', error);
    throw new Error('女性アフィリエイター風変換に失敗しました');
  }
}
