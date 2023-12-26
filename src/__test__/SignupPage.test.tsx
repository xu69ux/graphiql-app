import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { WelcomePage } from '../pages';

describe('SignUpPage component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Router>
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <WelcomePage />
        </LanguageContext.Provider>
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
