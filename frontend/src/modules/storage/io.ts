export const saveToStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getFromStorage = (key: string): string => localStorage.getItem(key);
