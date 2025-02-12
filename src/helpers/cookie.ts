/**
 * 指定した Cookie 名の値を取得する
 * @param name 取得したい Cookie の名前
 * @returns Cookie の値。存在しない場合はnullを返す
 */
export const getCookieValueByName = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const cookiesArray = cookie.split("=");
    if (cookiesArray[0].trim() === name.trim()) {
      return cookiesArray.slice(1).join("=").trim();
    }
  }
  return null;
};

/**
 * 指定した Cookie を削除する
 * @param cookieName 削除したいCookieの名前
 */
export const deleteCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
