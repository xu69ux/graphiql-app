import { render, screen } from '@testing-library/react';
import { Documentation } from '../components';

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
