import { render, fireEvent } from '@testing-library/react';
import { BackButton } from '../components';

const mockSelectedType = {
  name: 'Test type',
  description: 'Test description',
  fields: [
    {
      name: 'Test field',
      description: 'Test description',
      type: {
        kind: 'Test type',
        description: 'Test type description',
      },
    },
  ],
  kind: 'Test kind',
};

const mockSelectedField = {
  name: 'Test field',
  description: 'Test description',
  type: {
    kind: 'Test type',
    description: 'Test type description',
  },
};

const mockSelectedKind = {
  kind: 'Test kind',
  description: 'Test description',
};

describe('BackButton', () => {
  it('calls setSelectedField with null when selectedField is not null', () => {
    const setSelectedField = jest.fn();
    const { getByTestId } = render(
      <BackButton
        selectedField={mockSelectedField}
        setSelectedField={setSelectedField}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedField).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedKind with null when selectedKind is not null and selectedField is null', () => {
    const setSelectedKind = jest.fn();
    const { getByTestId } = render(
      <BackButton
        selectedKind={mockSelectedKind}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with null when selectedType is not null, and selectedField and selectedKind are null', () => {
    const setSelectedType = jest.fn();
    const { getByTestId } = render(
      <BackButton
        selectedType={mockSelectedType}
        setSelectedType={setSelectedType}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(null);
  });
});
