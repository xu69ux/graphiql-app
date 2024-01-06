import { render, screen } from './test-utils';
import { Documentation } from '@components/index';
import { GraphQLSchema } from '@appTypes/types';

const mockSchema: GraphQLSchema = {
  types: [
    {
      name: 'Type1 name',
      fields: [
        {
          name: 'Field1 name',
          description: 'Field1 description',
          type: {
            name: 'Kind1 name',
            kind: 'Kind1 kind',
            description: 'Kind1 description',
          },
        },
      ],
      kind: 'Type1 kind',
    },
  ],
};

test('renders Documentation title', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);
  const titleElements = screen.getAllByText(/Documentation/i);
  expect(titleElements.length).toBe(1);
});

test('renders open class when isDocumentationOpen is true', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).toHaveClass('open');
});

test('does not render open class when isDocumentationOpen is false', () => {
  render(<Documentation isDocumentationOpen={false} schema={null} />);
  const documentationElement = screen.getByTestId('documentation');
  expect(documentationElement).not.toHaveClass('open');
});
