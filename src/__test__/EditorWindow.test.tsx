import { render, fireEvent } from '@testing-library/react';
import { EditorWindow } from '@components/index';

test('EditorWindow renders correctly and updates data on blur', () => {
  const mockUpdateData = jest.fn();
  const { getByRole, rerender } = render(
    <EditorWindow code='line1' updateData={mockUpdateData} />,
  );

  const textarea = getByRole('textbox');
  expect(textarea).toHaveValue('line1');

  fireEvent.blur(textarea, { target: { value: 'new code' } });
  expect(mockUpdateData).toHaveBeenCalledWith('new code');

  rerender(<EditorWindow code='new code' updateData={mockUpdateData} />);
  expect(textarea).toHaveValue('new code');
});
