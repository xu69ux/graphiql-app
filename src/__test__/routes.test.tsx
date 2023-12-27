import { render } from '@testing-library/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from '../routes';

test('renders the correct component for a route', () => {
  window.history.pushState({}, '', '/');

  const { getByText } = render(
    <Router>
      <Routes>{routes}</Routes>
    </Router>,
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
