import { render } from './test-utils';
import { PasswordValidIndicator } from '../components';

test('PasswordValidIndicator shows correct progress for password validity', () => {
  let { container } = render(<PasswordValidIndicator password='' />);
  let progressBar = container.querySelector(
    '.password-indicator div div',
  ) as HTMLElement;
  expect(progressBar?.style.width).toBe('0%');

  container = render(<PasswordValidIndicator password='a' />).container;
  progressBar = container.querySelector(
    '.password-indicator div div',
  ) as HTMLElement;
  expect(progressBar?.style.width).toBe('20%');

  container = render(<PasswordValidIndicator password='Aa1@aaaa' />).container;
  progressBar = container.querySelector(
    '.password-indicator div div',
  ) as HTMLElement;
  expect(progressBar?.style.width).toBe('100%');
});
