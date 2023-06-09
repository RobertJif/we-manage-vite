export type LocalStorageKeyType = `QUESTION_${number}_ANSWER`;

export const setClientLocalStorage = (key: LocalStorageKeyType, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};
export const getClientLocalStorage = (key: LocalStorageKeyType) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return undefined;
};
export const removeClientLocalStorage = (key: LocalStorageKeyType) => {
  if (typeof window !== "undefined") {
    return window.localStorage.removeItem(key);
  }
};
