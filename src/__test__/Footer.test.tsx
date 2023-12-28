import { render, screen } from '@testing-library/react';
import { Footer } from '../components';
import { LanguageContext } from '../contexts/LanguageContext';

describe('Footer', () => {
  const mockContext = {
    language: 'eng',
    setLanguage: () => {},
  };

  it('renders without crashing', () => {
    render(
      <LanguageContext.Provider value={mockContext}>
        <Footer />
      </LanguageContext.Provider>,
    );
  });

  it('displays the correct links', () => {
    render(
      <LanguageContext.Provider value={mockContext}>
        <Footer />
      </LanguageContext.Provider>,
    );

    expect(screen.getByRole('link', { name: /JS do IT/i })).toHaveAttribute(
      'href',
      'https://github.com/xu69ux/graphiql-app',
    );
    expect(screen.getByTestId('xu-link')).toHaveAttribute(
      'href',
      'https://github.com/xu69ux',
    );
    expect(screen.getByTestId('dbox7-link')).toHaveAttribute(
      'href',
      'https://github.com/dbox7',
    );
    expect(screen.getByTestId('gekko-link')).toHaveAttribute(
      'href',
      'https://github.com/GEKKO-ops',
    );
  });

  it('displays the course logo', () => {
    render(
      <LanguageContext.Provider value={mockContext}>
        <Footer />
      </LanguageContext.Provider>,
    );

    expect(screen.getByAltText('rs school logo')).toBeInTheDocument();
  });
});
