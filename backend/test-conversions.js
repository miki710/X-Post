import dotenv from 'dotenv';
import { zundamonify } from './zundamonify.js';
import { obasanify } from './obasanify.js';

dotenv.config();

async function testConversions() {
  const testTexts = [
    "今日は友達とカフェに行ってケーキを食べました。",
    "天気が良かったので散歩しました。",
    "最近は忙しくてあまり寝られていません。"
  ];

  console.log('=== テスト開始 ===\n');

  for (const text of testTexts) {
    console.log(`元のテキスト: ${text}`);
    
    try {
      // ずんだもん風テスト
      const zundamonResult = await zundamonify(text, process.env.GOOGLE_API_KEY);
      console.log(`ずんだもん風: ${zundamonResult}`);
      
      // おばさん構文テスト
      const obasanResult = await obasanify(text, process.env.GOOGLE_API_KEY);
      console.log(`おばさん構文: ${obasanResult}`);
    } catch (error) {
      console.error(`エラー: ${error.message}`);
    }
    
    console.log('---\n');
  }
}

// 環境変数チェック
if (!process.env.GOOGLE_API_KEY) {
  console.error('エラー: GOOGLE_API_KEYが設定されていません。.envファイルを確認してください。');
  process.exit(1);
}

testConversions();