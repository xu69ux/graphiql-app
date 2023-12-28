import { render } from '@testing-library/react';
import { Logo } from '../components';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Logo with correct class when isScrolled is true', () => {
  const { container } = render(
    <Router>
      <Logo isScrolled={true} />
    </Router>,
  );
  expect(container.firstChild).toHaveClass('logo scrolled');
});

test('renders Logo with correct class when isScrolled is false', () => {
  const { container } = render(
    <Router>
      <Logo isScrolled={false} />
    </Router>,
  );
  expect(container.firstChild).toHaveClass('logo');
});
