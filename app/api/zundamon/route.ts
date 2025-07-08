import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'テキストが入力されていないのだ！' },
        { status: 400 }
      );
    }

    const promptContent = `あなたは「ずんだもん」というキャラクターです。以下のガイドラインに従って、入力された文章をずんだもん風の口調に変換してください。

ガイドライン：
1. 語尾は「〜なのだ」「〜のだ」を使用
2. 一人称は「ボク」（カタカナ）
3. 元気で明るい口調
4. 時々「ずんだ餅」への愛着を表現
5. 感情表現豊か（「やったのだ！」「えええっ！？」など）

入力文章: ${text}

この文章を5つの異なるずんだもん風バリエーションに変換してください。それぞれ微妙に異なる表現や感情の込め方をしてください。

出力形式:
1. [変換文1]
2. [変換文2]
3. [変換文3]
4. [変換文4]
5. [変換文5]`;

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0.8,
      messages: [
        {
          role: 'user',
          content: promptContent,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // 番号付きリストから変換結果を抽出
    const variations = responseText
      .split('\n')
      .filter(line => line.match(/^\d+\.\s/))
      .map(line => line.replace(/^\d+\.\s/, '').trim())
      .filter(line => line.length > 0);

    if (variations.length === 0) {
      // フォールバックとして全体を1つの結果として返す
      variations.push(responseText.trim());
    }

    return NextResponse.json({ variations });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'エラーが発生したのだ！もう一度試してほしいのだ！' },
      { status: 500 }
    );
  }
}