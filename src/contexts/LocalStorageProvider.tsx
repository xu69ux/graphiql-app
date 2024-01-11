import { useState } from 'react';
import { LocalStorageContext } from '@contexts/LocalStorageContext';

export const LocalStorageProvider = ({ children }) => {
  const [isLocalCleared, setLocalCleared] = useState(true);

  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setLocalCleared(false);
  };
  const removeItem = (key: string) => localStorage.removeItem(key);
  const clear = () => {
    localStorage.clear();
    setLocalCleared(true);
  };

  return (
    <LocalStorageContext.Provider
      value={{ getItem, setItem, removeItem, clear, isLocalCleared }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
