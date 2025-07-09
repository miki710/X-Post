// backend/influencerify.js
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function influencerify(text, apiKey) {
  if (!text || !apiKey) {
    throw new Error("テキストまたは Google API キーが設定されていません")
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `
以下の日本語テキストを、女性アフィリエイター風の親しみやすくて魅力的な口調に書き換えてください。
絵文字・顔文字・タメ口などを活用しながらも、商品やサービスの良さが自然と伝わるようにしてください。
意味や事実は変えず、文章の雰囲気だけを調整してください。

【スタイル例】
🟪 千賀大先生も絶賛する美顔器は超ズボラな私でも1年半以上続いてるからほんとにおすすめよ。正直今まで使ってきた美顔器、スチーマー系全部手放して今これしか持ってない。電気マイクロニードルが肌表面に小さい穴開けて毛穴改善モードとかあるしほんまにすごいよ

🟪 新社会人は自分がご機嫌になれる方法を1つ持っとくといいよ…
私は自分のご機嫌取りにエシレ使ってる。美味すぎるよエシレ…

🟪 乾燥肌すぎて顔に塗る日焼け止めはめちゃくちゃ慎重になるタイプなんだけど、ナチュラルベールはサラサラなのに全然乾燥感じなくて顔面砂漠化しなかった…！！ほんのりトーンアップしてくすみ吹き飛ぶし、ノンケミで肌にもやさしくて毎日使える🙏🏻 #PR #ロート製薬

【変換対象】
${text}

【出力】
変換後のテキストのみを出力してください。
  `.trim()

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })

    const response = await result.response
    if (!response) throw new Error('Gemini APIからのレスポンスが空です')

    return response.text().trim()
  } catch (error) {
    console.error('Error in influencerify:', error)
    throw new Error('女性アフィリエイター風変換に失敗しました')
  }
}
