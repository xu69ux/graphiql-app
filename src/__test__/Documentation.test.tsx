import { render, screen, fireEvent } from './test-utils';
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

test('renders type names from schema', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);
  const typeNameElement = screen.getByText('Type1 name:');
  expect(typeNameElement).toBeInTheDocument();
});

test('does not render field names from schema until type is clicked', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);

  let fieldNameElement = screen.queryByText('Field1 name:');
  expect(fieldNameElement).not.toBeInTheDocument();

  const typeNameElement = screen.getByText('Type1 name:');
  fireEvent.click(typeNameElement);

  fieldNameElement = screen.getByText('Field1 name:');
  expect(fieldNameElement).toBeInTheDocument();
});

test('does not render kind names from schema until type is clicked', () => {
  render(<Documentation isDocumentationOpen={true} schema={mockSchema} />);

  let kindNameElement = screen.queryByText('Kind1 name:');
  expect(kindNameElement).not.toBeInTheDocument();

  const typeNameElement = screen.getByText('Type1 name:');
  fireEvent.click(typeNameElement);

  kindNameElement = screen.getByText('Kind1 name');
  expect(kindNameElement).toBeInTheDocument();
});
