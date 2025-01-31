import { useI18n } from "vue-i18n";
import type { Rule } from "./types";

// 必須バリデーション
export const requireValidate = (): Rule => {
  const { t } = useI18n();
  return (val: string | null): string | true => {
    if (val !== null && val !== "") {
      return true;
    }
    return t("validation.required");
  };
};
