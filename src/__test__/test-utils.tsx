import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactElement } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { LocalStorageContext } from '@contexts/LocalStorageContext';

/* eslint-disable react-refresh/only-export-components */
export const setLanguage = jest.fn();
export const getItem = jest.fn();
export const setItem = jest.fn();
export const removeItem = jest.fn();
export const clear = jest.fn();

export const MockLanguageProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const mockLanguageContextValue = {
    language: 'eng',
    setLanguage,
  };

  const mockLocalStorageContextValue = {
    getItem,
    setItem,
    removeItem,
    clear,
    isLocalCleared: true,
  };

  return (
    <LanguageContext.Provider value={mockLanguageContextValue}>
      <LocalStorageContext.Provider value={mockLocalStorageContextValue}>
        <Router>{children}</Router>
      </LocalStorageContext.Provider>
    </LanguageContext.Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: MockLanguageProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
