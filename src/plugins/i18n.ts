import { createI18n } from "vue-i18n";
import ja from "@/locales/ja.json";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

// メッセージの型を定義
type MessageSchema = typeof ja;


// ブラウザの言語を検出する関数
function getBrowserLocale(): string {
  const browserLocale = navigator.language || navigator.languages[0];
  
  // ブラウザのロケールを対応する言語にマッピング
  if (browserLocale.startsWith('ja')) return 'ja';
  if (browserLocale.startsWith('en')) return 'en';
  if (browserLocale.startsWith('zh')) return 'zh';
  
  // デフォルトは日本語
  return 'ja';
}

const i18n = createI18n<[MessageSchema], "ja" | "en" | "zh", false>({
  legacy: false,
  locale: getBrowserLocale(), // ブラウザの言語を自動検出
  globalInjection: true,
  messages: {
    ja,
    en,
    zh,
  },
});

export default i18n;

export class SettingLocale {
  changeLocale(selectedLocale: "ja" | "en" | "zh"): void {
    i18n.global.locale.value = selectedLocale;
  }
}
