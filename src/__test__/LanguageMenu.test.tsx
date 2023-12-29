import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { LanguageMenu } from '../components';

describe('LanguageMenu', () => {
  it('changes language when language dropdown is clicked', () => {
    const setLanguage = jest.fn();

    const { getByTitle, getByText } = render(
      <LanguageContext.Provider value={{ language: 'eng', setLanguage }}>
        <Router>
          <LanguageMenu isScrolled={false} />
        </Router>
      </LanguageContext.Provider>,
    );

    fireEvent.click(getByTitle('change language'));
    fireEvent.click(getByText('rus'));

    expect(setLanguage).toHaveBeenCalledWith('rus');
  });

  it('renders with correct class when isScrolled is true', () => {
    const { container } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <LanguageMenu isScrolled={true} />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(container.firstChild).toHaveClass('lang-menu scrolled');
  });

  it('renders with correct class when isScrolled is false', () => {
    const { container } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <LanguageMenu isScrolled={false} />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(container.firstChild).toHaveClass('lang-menu');
  });
});
