import { render, screen } from './test-utils';
import { Footer } from '@components/index';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('displays the correct links', () => {
    render(<Footer />);
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
    render(<Footer />);
    expect(screen.getByAltText('rs school logo')).toBeInTheDocument();
  });
});
