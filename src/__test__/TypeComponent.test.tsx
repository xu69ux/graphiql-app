import { render, fireEvent } from '@testing-library/react';
import { TypeComponent } from '../components';

test('renders the TypeComponent and responds to field click events', () => {
  const mockFieldClickHandler = jest.fn();
  const mockKindClickHandler = jest.fn();

  const props = {
    onFieldClick: mockFieldClickHandler,
    onKindClick: mockKindClickHandler,
    type: {
      name: 'Type1',
      kind: 'Type1 Kind',
      fields: [
        {
          name: 'Field1',
          description: 'Field1 Description',
          type: {
            kind: 'Kind1',
            name: 'Kind1 Name',
            description: 'Kind1 Description',
          },
        },
      ],
    },
  };

  const { getByText } = render(<TypeComponent {...props} />);

  const field = getByText('Field1:');
  fireEvent.click(field);

  expect(mockFieldClickHandler).toHaveBeenCalled();
});
