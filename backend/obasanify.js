import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('🟢 obasanify.js が読み込まれました');

export async function obasanify(text, apiKey) {
  console.log('🚀 obasanify 実行開始');
  console.log('🔑 APIキー:', apiKey);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // ここにも追加できます：
  console.log('📡 モデル取得完了');

  const prompt = `以下の日本語テキストを「おばさん構文」に変換してください。

変換ルール:
1. 絵文字や顔文字を頻繁に使う
   - 例：😊✨💕💦💖（笑）（泣）など
   - 文章の終わりや途中に自然に挿入

2. 語尾を伸ばす・繰り返す・テンションを上げる
   - 例：「〜ね〜！」「〜なのよ〜」「〜しちゃって💦」「ほんとにビックリ！！」

3. 句読点を多用する
   - 「、」や「。」を多く入れる
   - 「！」や「〜」を連続して使うことも多い

4. 主語や内容がやや曖昧でもテンションが高い
   - 例：「あれ、なんだったかしら〜（笑）」「すごいのよ、ほんとに〜！！」

5. 親しみやノリを出す
   - 「〇〇ちゃん」「うふふ」「〜だったのよね〜💕」のような親しみ語調

参考例:
入力: 今日は友達とカフェに行ってケーキを食べました。
出力: 今日はね〜、友達とカフェに行ってきたのよ〜☕🍰💕 ケーキがすっごく美味しくてビックリしちゃった！！✨😊（笑）

入力: 天気が良かったので散歩しました。
出力: 天気がね〜、ほんとに良くて〜🌞 ついお散歩しちゃったのよ〜〜〜！気持ちよかったわぁ😊✨

入力テキスト:
${text}

変換後のテキストのみを出力してください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error in obasanify:', error);
    throw new Error('おばさん構文変換に失敗しました');
  }
}