import { useCallback, useState } from "react";

export const useStorage = ({
  storageType,
  key,
  initialValue,
  dependencyInitValue,
}: {
  storageType: "localStorage" | "sessionStorage";
  key: string;
  initialValue?: any;
  dependencyInitValue?: any;
}) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      if (!storageType) throw new Error("StorageType must be assigned");
      const itemValue = window[storageType].getItem(key);

      if (itemValue && dependencyInitValue instanceof Function) {
        return dependencyInitValue(itemValue);
      }

      if (itemValue) return itemValue ? JSON.parse(itemValue) : initialValue;

      if (!itemValue && dependencyInitValue) {
        const value =
          dependencyInitValue instanceof Function
            ? dependencyInitValue()
            : dependencyInitValue;

        if (value) {
          window[storageType].setItem(key, JSON.stringify(value));
          const newItemValue = window[storageType].getItem(key);
          if (newItemValue)
            return newItemValue ? JSON.parse(newItemValue) : initialValue;
        }
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        if (typeof window !== "undefined") {
          setStoredValue(valueToStore);
          window[storageType].setItem(
            key,
            typeof valueToStore === "string"
              ? valueToStore
              : JSON.stringify(valueToStore)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storageType, storedValue]
  );

  return { storedValue, setValue, setStoredValue };
};
