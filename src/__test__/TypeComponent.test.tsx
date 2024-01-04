import { render, fireEvent } from '@testing-library/react';
import { TypeComponent } from '../components';
import { FieldType, Type } from '../types';

test('renders the TypeComponent and responds to field click events', () => {
  const mockType: Type = {
    name: 'TestType',
    description: 'TestTypeDescription',
    fields: [
      {
        name: 'TestField',
        description: 'TestFieldDescription',
        type: { kind: 'Kind1' },
      },
    ],
    kind: 'Kind1',
  };

  const mockField: FieldType = {
    name: 'TestField',
    description: 'TestFieldDescription',
    type: { kind: 'Kind1' },
  };
  const setSelectedField = jest.fn();
  const setSelectedKind = jest.fn();
  const setSelectedType = jest.fn();

  const { getByText } = render(
    <TypeComponent
      schema={null}
      selectedType={mockType}
      selectedField={null}
      setSelectedField={setSelectedField}
      setSelectedKind={setSelectedKind}
      setSelectedType={setSelectedType}
    />,
  );

  const field = getByText('TestField');
  fireEvent.click(field);

  expect(field).toBeInTheDocument();
  expect(setSelectedField).toHaveBeenCalledWith(mockField);
});
