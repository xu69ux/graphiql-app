import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactElement } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export const setLanguage = jest.fn();

export const MockLanguageProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const mockContextValue = {
    language: 'eng',
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={mockContextValue}>
      <Router>{children}</Router>
    </LanguageContext.Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: MockLanguageProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
