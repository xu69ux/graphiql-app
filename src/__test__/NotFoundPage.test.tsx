import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { LanguageProvider } from '../contexts/LanguageProvider';
import NotFoundPage from '../pages/NotFoundPage';

test('renders not found message', () => {
  render(
    <LanguageProvider>
      <Router>
        <NotFoundPage />
      </Router>
    </LanguageProvider>,
  );
  const linkElement = screen.getByText(
    /oops, the page you're looking for is not found!/i,
  );
  expect(linkElement).toBeInTheDocument();
});

test('renders not found titles based on language context', () => {
  render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Router>
        <NotFoundPage />
      </Router>
    </LanguageContext.Provider>,
  );
  const title1 = screen.getByText(
    /oops, the page you're looking for is not found!/i,
  );
  const title2 = screen.getByText(/go back to the/i);
  const title3 = screen.getByText(/or check out a random meme:/i);
  expect(title1).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
  expect(title3).toBeInTheDocument();
});

test('renders link to main page', () => {
  render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Router>
        <NotFoundPage />
      </Router>
    </LanguageContext.Provider>,
  );
  const linkElement = screen.getByText(/main page/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/');
});

test('renders meme image', () => {
  render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Router>
        <NotFoundPage />
      </Router>
    </LanguageContext.Provider>,
  );
  const imageElement = screen.getByAltText(/meme about garphQL/i);
  expect(imageElement).toBeInTheDocument();
});
