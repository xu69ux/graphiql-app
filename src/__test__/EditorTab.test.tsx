import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { EditorTab } from '@components/index';

test('EditorTab renders correctly and handles events', () => {
  const mockOnTabClick = jest.fn();
  const mockOnCloseClick = jest.fn();
  const mockOnNameChange = jest.fn();

  const { getByTestId } = render(
    <EditorTab
      id={1}
      name='Tab 1'
      isActive={true}
      onTabClick={mockOnTabClick}
      onCloseClick={mockOnCloseClick}
      onNameChange={mockOnNameChange}
      totalTabs={2}
    />,
  );

  const tab = getByTestId('tab');
  act(() => {
    fireEvent.click(tab);
  });
  expect(mockOnTabClick).toHaveBeenCalledWith(1);

  const closeButton = getByTestId('tab-close');
  act(() => {
    fireEvent.click(closeButton);
  });
  expect(mockOnCloseClick).toHaveBeenCalledWith(1);

  const input = getByTestId('tab-title-input');
  act(() => {
    fireEvent.change(input, { target: { value: 'New Tab Name' } });
  });
  expect(mockOnNameChange).toHaveBeenCalledWith(1, 'New Tab Name');
});
