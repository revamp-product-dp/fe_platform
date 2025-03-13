import { useI18n } from "vue-i18n";
import type { Rule } from "./types";

const emailFormat =
  /^(?!.*\.\.)(?!.*(^\.|\.$))(?!.*(^-|-$))(?!.*\.$)(?!-.*\.)[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?(?<!-)(?<!\.)@[a-zA-Z0-9.-]+(?<!^\d+\.\d+$)\.[a-zA-Z]{2,}$/;

// メールアドレスの形式チェックバリデーション
export const emailValidate = (): Rule => {
  const { t } = useI18n();
  return (val: string | null | undefined): string | true => {
    if (typeof val !== "string") {
      return true;
    }
    if (val.length > 255 || val.indexOf("@") > 64 || val.indexOf("@") === -1) {
      return t("validation.email");
    }
    if (val.match(emailFormat)) {
      return true;
    }
    return t("validation.email");
  };
};
