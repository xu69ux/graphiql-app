import { render, fireEvent } from '@testing-library/react';
import { CustomButton } from '@components/index';

test('renders the button and responds to click events', () => {
  const handleClick = jest.fn();

  const { getByText } = render(
    <CustomButton
      className='test-button'
      onClick={handleClick}
      title='Test Button'
      data-testid='test-button'
    />,
  );

  const button = getByText('Test Button');
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalledTimes(1);
});
