import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import { LanguageContext } from '../contexts/LanguageContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('react-icons/io5', () => ({
  IoChevronForward: () => <div>Mock Icon</div>,
}));

describe('WelcomePage', () => {
  it('renders the WelcomePage component', () => {
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

  it('renders welcome message', () => {
    const { getByText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <WelcomePage />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(
      getByText((_, node) => {
        const hasText = (node: HTMLElement) =>
          node.textContent === 'GraphiQL IDE';
        const nodeHasText = hasText(node as HTMLElement);
        const childrenDontHaveText = Array.from(
          (node as HTMLElement).children,
        ).every((child) => !hasText(child as HTMLElement));

        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
  });

  it('renders login and signup links', async () => {
    const { container } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <WelcomePage />
        </Router>
      </LanguageContext.Provider>,
    );

    const loginLink = container.querySelector('a[href="/login"]');
    expect(loginLink).toHaveTextContent(/log\s*in/i);

    const signupLink = container.querySelector('a[href="/signup"]');
    expect(signupLink).toHaveTextContent(/sign\s*up/i);
  });
});
