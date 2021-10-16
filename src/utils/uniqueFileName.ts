// firebaseの使用上、同じファイル名のものがあると、先にあるものが削除されてしまう
// ファイル名の先頭にランダムな文字を付与することで上記の問題を防ぐための関数
export const uniqueFileName = (file: File) => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  return randomChar + "_" + file.name;
};
