import { render, fireEvent } from './test-utils';
import { ModalWindowSetting } from '@components/index';

describe('ModalWindowSetting', () => {
  it('renders correctly', () => {
    const onClick = jest.fn();

    const { getByText } = render(
      <ModalWindowSetting
        title='Test Title'
        value='Test Value'
        onClick={onClick}
      />,
    );

    expect(getByText('Test Title:')).toBeInTheDocument();
    expect(getByText('Test Value')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const onClick = jest.fn();

    const { getByText } = render(
      <ModalWindowSetting
        title='Test Title'
        value='Test Value'
        onClick={onClick}
      />,
    );

    fireEvent.click(getByText('Test Value'));

    expect(onClick).toHaveBeenCalled();
  });
});
