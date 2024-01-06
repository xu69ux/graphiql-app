import { render, fireEvent } from '@testing-library/react';
import { BackButton } from '@components/index';
import { IBackButtonProps } from '../components/Documentation/components/BackButton';

const selectedField = {
  name: 'field',
  description: 'desc',
  type: { kind: 'kind', name: 'name', description: 'desc' },
};
const selectedKind = null;
const selectedType = null;

const setSelectedField = jest.fn();
const setSelectedKind = jest.fn();
const setSelectedType = jest.fn();

const mockProps: IBackButtonProps = {
  selectedField,
  setSelectedField,
  selectedKind,
  setSelectedKind,
  selectedType,
  setSelectedType,
};

describe('BackButton', () => {
  it('calls setSelectedField with null when selectedField is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedField).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedKind with null when selectedKind is not null and selectedField is null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with null when selectedType is not null, and selectedField and selectedKind are null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={setSelectedType}
        selectedKind={null}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(null);
  });
});
