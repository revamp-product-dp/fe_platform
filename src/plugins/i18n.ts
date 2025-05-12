import { createI18n } from "vue-i18n";
import ja from "@/locales/ja.json";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

// メッセージの型を定義
type MessageSchema = typeof ja;

const i18n = createI18n<[MessageSchema], "ja" | "en" | "zh", false>({
  legacy: false,
  locale: "ja",
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
