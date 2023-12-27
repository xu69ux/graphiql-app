import { render, screen, fireEvent, act } from '@testing-library/react';
import { Documentation } from '../components';
import { Schema } from '../types';

const mockSchema: Schema = {
  types: [
    {
      name: 'TypeName',
      description: 'Type Description',
      fields: [
        {
          name: 'FieldName',
          description: 'Field Description',
          type: {
            kind: 'Kind',
            description: 'Type Description',
          },
        },
      ],
      kind: 'Kind',
    },
  ],
};

test('renders Documentation title', () => {
  render(<Documentation isDocumentationOpen={true} schema={null} />);
  const titleElements = screen.getAllByText(/Documentation/i);
  expect(titleElements.length).toBe(2);
});

test('renders open class when isDocumentationOpen is true', () => {
  render(<Documentation isDocumentationOpen={true} schema={null} />);
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).toHaveClass('open');
});

test('does not render open class when isDocumentationOpen is false', () => {
  render(<Documentation isDocumentationOpen={false} schema={null} />);
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).not.toHaveClass('open');
});

test('renders no-docs text when schema is null', () => {
  const { container } = render(
    <Documentation isDocumentationOpen={true} schema={null} />,
  );
  const noDocsElement = container.querySelector('.no-docs');
  expect(noDocsElement).toBeInTheDocument();
  expect(noDocsElement?.textContent).toBe(
    'Enter the endpoint to retrieve documentation',
  );
});

test('handleBackClick function works correctly', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);

  const typeItem = screen.getByTestId('type-item');
  act(() => {
    fireEvent.click(typeItem);
  });
  expect(screen.getByTestId('selected-type').textContent).toBe('TypeName:');

  const fieldItem = screen.getByTestId('field-item-FieldName');
  act(() => {
    fireEvent.click(fieldItem);
  });
  expect(screen.getByTestId('selected-field').textContent).toBe('FieldName:');

  const backButton = screen.getByTestId('back-button');
  act(() => {
    fireEvent.click(backButton);
  });
  expect(screen.getByTestId('selected-type').textContent).toBe('TypeName:');
});
