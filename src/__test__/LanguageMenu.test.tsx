import {
  render,
  fireEvent,
  MockLanguageProvider,
  setLanguage,
} from './test-utils';
import { LanguageMenu } from '@components/index';

describe('LanguageMenu', () => {
  it('changes language when language dropdown is clicked', () => {
    const { getByTitle, getByText } = render(
      <LanguageMenu isScrolled={false} />,
      { wrapper: MockLanguageProvider },
    );

    fireEvent.click(getByTitle('change language'));
    fireEvent.click(getByText('rus'));

    expect(setLanguage).toHaveBeenCalledWith('rus');
  });

  it('renders with correct class when isScrolled is true', () => {
    const { container } = render(<LanguageMenu isScrolled={true} />);

    expect(container.firstChild).toHaveClass('lang-menu scrolled');
  });

  it('renders with correct class when isScrolled is false', () => {
    const { container } = render(<LanguageMenu isScrolled={false} />);

    expect(container.firstChild).toHaveClass('lang-menu');
  });
});
