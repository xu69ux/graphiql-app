import React from 'react';

interface LocalStorageContextProps {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  isLocalCleared: boolean;
}

export const LocalStorageContext = React.createContext<
  LocalStorageContextProps | undefined
>(undefined);
