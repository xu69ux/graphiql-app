import { render } from './test-utils';
import { Logo } from '../components';

test('renders Logo with correct class when isScrolled is true', () => {
  const { container } = render(<Logo isScrolled={true} />);
  expect(container.firstChild).toHaveClass('logo scrolled');
});

test('renders Logo with correct class when isScrolled is false', () => {
  const { container } = render(<Logo isScrolled={false} />);
  expect(container.firstChild).toHaveClass('logo');
});
