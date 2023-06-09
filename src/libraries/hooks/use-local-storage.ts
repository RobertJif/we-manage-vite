import {
  getClientLocalStorage,
  type LocalStorageKeyType,
  setClientLocalStorage,
} from "@app-util/local-storage";
import { useState } from "react";
export default function useLocalStorage<T>(
  key: LocalStorageKeyType,
  initialValue: T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getClientLocalStorage(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setClientLocalStorage(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}