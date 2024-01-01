import { render, screen, fireEvent, act } from '@testing-library/react';
import { Documentation } from '../components';
import { GraphQLSchema } from '../types';
import { LanguageProvider } from '../contexts/LanguageProvider';

const mockSchema: GraphQLSchema = {
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
  directives: [],
};

test('renders Documentation title', () => {
  render(
    <LanguageProvider>
      <Documentation isDocumentationOpen={true} schema={null} />
    </LanguageProvider>,
  );
  const titleElements = screen.getAllByText(/Documentation/i);
  expect(titleElements.length).toBe(1);
});

test('renders open class when isDocumentationOpen is true', () => {
  render(
    <LanguageProvider>
      <Documentation isDocumentationOpen={true} schema={null} />
    </LanguageProvider>,
  );
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).toHaveClass('open');
});

test('does not render open class when isDocumentationOpen is false', () => {
  render(
    <LanguageProvider>
      <Documentation isDocumentationOpen={false} schema={null} />
    </LanguageProvider>,
  );
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).not.toHaveClass('open');
});

test('handleBackClick function works correctly', () => {
  render(
    <LanguageProvider>
      <Documentation isDocumentationOpen={true} schema={mockSchema} />
    </LanguageProvider>,
  );

  const typeItem = screen.getByTestId('type-item');
  act(() => {
    fireEvent.click(typeItem);
  });
  expect(screen.getByTestId('selected-type').textContent).toBe(
    'TypeName:FieldName',
  );

  const fieldItem = screen.getByText('FieldName');
  act(() => {
    fireEvent.click(fieldItem);
  });
  expect(screen.getByTestId('field-item').textContent).toBe(
    'FieldName:KindField Description',
  );

  const backButton = screen.getByTestId('back-button');
  act(() => {
    fireEvent.click(backButton);
  });
  expect(screen.getByTestId('selected-type').textContent).toBe(
    'TypeName:FieldName',
  );
});
