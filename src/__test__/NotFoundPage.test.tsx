import { render, screen } from './test-utils';
import NotFoundPage from '../pages/NotFoundPage';

test('renders not found message', () => {
  render(<NotFoundPage />);
  const linkElement = screen.getByText(
    /oops, the page you're looking for is not found!/i,
  );
  expect(linkElement).toBeInTheDocument();
});

test('renders not found titles based on language context', () => {
  render(<NotFoundPage />);
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
  render(<NotFoundPage />);
  const linkElement = screen.getByText(/main page/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/');
});

test('renders meme image', () => {
  render(<NotFoundPage />);
  const imageElement = screen.getByAltText(/meme about garphQL/i);
  expect(imageElement).toBeInTheDocument();
});
